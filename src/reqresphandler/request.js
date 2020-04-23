import ResponseObject from '../reqresphandler/responseObj';
import moment from 'moment';
import firebase from '../../dbconfig'

class HandleRequest {
    deliveryFailureReason = [
        "Delivery",
        "Unable to Locate Address",
        "Buyer Not Availabe",
        "Buyer cannot be identified",
        "Unable to Submit Response"
    ]

    pickUpFailureReason = [
        "PickUp",
        "Unable to Locate Address",
        "Buyer Not Availabe",
        "Buyer cannot be identified",
        "Unable to Submit Response"
    ]

    submitRequest(selectedRequest, isDelivery, requestObj) {
        let responseObj = new ResponseObject();
        let now = moment(moment().toISOString());
        let deadline = moment(requestObj.date);
        let duration = moment.duration(deadline.diff(now));
        let mins = duration.minutes();
        let hoursInMins = duration.hours() * 60;
        let daysInMins = duration.days() * 24 * 60;
        mins = mins + hoursInMins + daysInMins;
        //console.log('Difference in Mins : ' + mins);
        if (mins < -15 || mins > 15) {
            let beforeExpectedTime = moment(requestObj.date);
            let afterExpectedTime = moment(requestObj.date);
            let start = beforeExpectedTime.subtract(15, 'm').format('h:mm:ss a');
            let end = afterExpectedTime.add(15, 'm').format('h:mm:ss a');
            if (mins > 0) {
                responseObj.message = 'Try Between ' + start + ' to ' + end;
                responseObj.status = '0000'
                responseObj.response = requestObj;
            } else {
                requestObj.status = 'TU';
                requestObj.failureReason = 'Time Up';
                responseObj.message = 'Time Up';
                responseObj.status = '1111';
                responseObj.response = requestObj;
            }
            return responseObj;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.sendRequest(requestObj, responseObj, selectedRequest, isDelivery));
        })
    }
    async sendRequest(requestObj, responseObj, selectedRequest, isDelivery) {
        return new Promise((resolve, reject) => {
            if (isDelivery) {
                if (selectedRequest == 0) {
                    requestObj.status = 'DS';
                    requestObj.failureReason = 'Delivery Success'
                } else {
                    requestObj.status = 'DF';
                    requestObj.failureReason = this.deliveryFailureReason[selectedRequest]; //Picker has five elements and FailureReason has four elements
                }
                firebase.database().ref('delivery/' + requestObj.deliveryId).set(requestObj).then(() => {
                    //console.log('Delivery Data Updated');
                    responseObj.status = '200';
                    responseObj.message = 'Success';
                    responseObj.response = requestObj;
                    //console.log('Delivery success : ' + JSON.stringify(responseObj.response))
                    resolve (responseObj);
                }
                ).catch((error) => {
                    //console.log('Error')
                    requestObj.status = 'DF';
                    requestObj.failureReason = 'Something Went Wrong'
                    responseObj.response = requestObj;
                    //console.log('delivery failed : ' + JSON.stringify(responseObj.response))
                    resolve (responseObj);
                });
            } else {
                if (selectedRequest == 0) {
                    requestObj.status = 'PS';
                    requestObj.failureReason = 'PickUp Success'
                } else {
                    requestObj.status = 'PF';
                    requestObj.failureReason = this.pickUpFailureReason[selectedRequest]; //Picker has five elements and FailureReason has four elements
                }
                firebase.database().ref('pickup/' + requestObj.pickUpId).set(requestObj).then(() => {
                    //console.log('PickUp Data Updated');
                    responseObj.status = '200';
                    responseObj.message = 'Success';
                    responseObj.response = requestObj;
                    //console.log('Pick up success : ' + JSON.stringify(responseObj.response))
                    resolve(responseObj);
                }
                ).catch((error) => {
                    //console.log('Error')
                    requestObj.status = 'PF';
                    requestObj.failureReason = 'Something Went Wrong'
                    responseObj.response = requestObj;
                    //console.log('Pick failed : ' + JSON.stringify(responseObj.response))
                    resolve(responseObj);
                });
            }
            let reportObj = requestObj;
            reportObj.date = moment().toISOString();
            firebase.database().ref('report/' + (isDelivery ? requestObj.deliveryId : requestObj.pickUpId)).set(reportObj).then(() => {
                //console.log('Report Inserted');
            }
            ).catch((error) => {
                //console.log('Report Error')
            });
        })

    }
}

export default HandleRequest;