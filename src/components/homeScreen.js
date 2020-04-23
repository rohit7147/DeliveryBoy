import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, SectionList } from 'react-native';
import { Container, Button, Picker, Spinner } from 'native-base';
import HandleRequest from '../reqresphandler/request'
import moment from 'moment';
import firebase from '../../dbconfig';
import reportData from '../report/dailyReport'
var isDelivery = true;
var isPickUp = false;
var isReport = false;
var handleReq = new HandleRequest()
var selectedRequest = 0;

function MySectionList({ title }) {
    let dateWithTime = '';
    dateWithTime = moment(title.date).format('YYYY-MM-DD, h:mm:ss a');
    let now = moment().toISOString();
    let deadline = moment(title.date);
    let duration = moment.duration(deadline.diff(now));
    let mins = duration.minutes();
    let hoursInMins = duration.hours() * 60;
    let daysInMins = duration.days() * 24 * 60;
    mins = mins + hoursInMins + daysInMins;
    let buttonText = '';
    let isReponseRecorded = true;
    if (mins < -15) {
        if (title.status == 'TBP' || title.status == 'TBD') {
            isReponseRecorded = false;
            buttonText = 'Time Up';
        }
    } else {
        if (title.status == 'TBP' || title.status == 'TBD') {
            isReponseRecorded = false;
            buttonText = 'Response To Be Recorded';
        }
    }
    let date = dateWithTime.split(',')[0];
    let time = dateWithTime.split(',')[1];
    return (
        <View style={styles.item}>
            <View style={styles.itemHead}>
                <View style={{ paddingTop: 15, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20 }}>{(title.service == 'Delivery') ? 'Delivery Id' : 'PickUp Id'}</Text>
                    <Text style={{ color: '#575757' }}>
                        {
                            (title.service == 'Delivery') ? title.deliveryId : title.pickUpId
                        }
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 30 }}>$</Text>
                    <Text style={{ color: 'red', fontSize: 15 }}>{title.price}</Text>
                </View>
            </View>
            <View style={styles.itemBody}>
                <View>
                    <Text style={{ fontSize: 20 }}>{title.Address.fullName}</Text>
                    <Text>{title.Address.houseNo}</Text>
                    <Text>{title.Address.locality}</Text>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>{(title.service == 'Delivery') ? 'ESTD Delivery' : 'ESTD Pick Up'}</Text>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                </View>
            </View>
            <View style={styles.itemFoot}>
                <Button disabled={true} style={{ backgroundColor: '#5D1049', height: '70%', justifyContent: 'center', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <Text style={{ color: '#fff' }}>
                        {
                            isReponseRecorded ? title.failureReason : buttonText
                        }
                    </Text>
                </Button>
            </View>
        </View>
    )
}

class PickerExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '0'
        };
    }

    onValueChange(value) {
        this.setState({
            selected: value

        });
        selectedRequest = value;
    }
    render() {
        return (

            <Picker
                note
                mode="dropdown"
                style={{ width: '90%' }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
            >
                <Picker.Item label={isDelivery ? handleReq.deliveryFailureReason[0] : handleReq.pickUpFailureReason[0]} value={0} />
                <Picker.Item label={isDelivery ? handleReq.deliveryFailureReason[1] : handleReq.pickUpFailureReason[1]} value={1} />
                <Picker.Item label={isDelivery ? handleReq.deliveryFailureReason[2] : handleReq.pickUpFailureReason[2]} value={2} />
                <Picker.Item label={isDelivery ? handleReq.deliveryFailureReason[3] : handleReq.pickUpFailureReason[3]} value={3} />
                <Picker.Item label={isDelivery ? handleReq.deliveryFailureReason[4] : handleReq.pickUpFailureReason[4]} value={4} />
            </Picker>
        );
    }
}

function Item({ title }) {
    let dateWithTime = '';
    dateWithTime = moment(title.date).format('YYYY-MM-DD, h:mm:ss a');
    let date = dateWithTime.split(',')[0];
    let time = dateWithTime.split(',')[1];
    let [buttonText, changeButtonText] = useState((title.status != 'TBD' && title.status != 'TBP') ? title.failureReason : 'Submit');
    let [isDisabled, disableButton] = useState((title.status != 'TBD' && title.status != 'TBP') ? true : false);
    let [isProcessing, processingState] = useState(false);
    return (
        <View style={styles.item}>
            <View style={styles.itemHead}>
                <View style={{ paddingTop: 15, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20 }}>{isDelivery ? 'Delivery Id' : 'PickUp Id'}</Text>
                    <Text style={{ color: '#575757' }}>
                        {
                            isDelivery ? title.deliveryId : title.pickUpId
                        }
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 30 }}>$</Text>
                    <Text style={{ color: 'red', fontSize: 15 }}>{title.price}</Text>
                </View>
            </View>
            <View style={styles.itemBody}>
                <View>
                    <Text style={{ fontSize: 20 }}>{title.Address.fullName}</Text>
                    <Text>{title.Address.houseNo}</Text>
                    <Text>{title.Address.locality}</Text>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>{isDelivery ? 'ESTD Delivery' : 'ESTD Pick Up'}</Text>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                </View>
            </View>
            <View>
                <PickerExample />
            </View>
            <View style={styles.itemFoot}>
                <Button disabled={isDisabled} onPress={
                    async () => {
                        try {
                            processingState(true)
                            let response = await handleReq.submitRequest(selectedRequest, isDelivery, title)
                            processingState(false);
                            //console.log('Response Received : ' + JSON.stringify(response))
                            let responseId = response.response.deliveryId;
                            let isDataFound = false;
                            if (isDelivery && response.status == '200') {
                                if (selectedRequest == 0) {
                                    for (let i = 0; i < reportData[0].data.length; i++) {
                                        if (reportData[0].data[i].deliveryId == responseId) {
                                            isDataFound = true;
                                            break;
                                        }
                                    }
                                    if (isDataFound == false) {
                                        reportData[0].data.push(response.response);
                                    }
                                    changeButtonText('Delivery Success')
                                } else {
                                    for (let i = 0; i < reportData[2].data.length; i++) {
                                        if (reportData[2].data[i].deliveryId == responseId) {
                                            isDataFound = true;
                                            break;
                                        }
                                    }
                                    if (isDataFound == false) {
                                        reportData[2].data.push(response.response);
                                    }
                                    changeButtonText(response.response.failureReason);
                                }
                                disableButton(true);
                                title = response.response;
                                let i = 0
                                for (i = 0; i < reportData[4].data.length; i++) {
                                    if (title.deliveryId == reportData[4].data[i].deliveryId) {
                                        break;
                                    }
                                }
                                if (reportData[4].data.length > 0 && i < reportData[4].data.length) {
                                    reportData[4].data.splice(i, 1);
                                }
                            } else if (!isDelivery && response.status == '200') {
                                if (selectedRequest == 0) {
                                    for (let i = 0; i < reportData[1].data.length; i++) {
                                        if (reportData[1].data[i].deliveryId == responseId) {
                                            isDataFound = true;
                                            break;
                                        }
                                    }
                                    if (isDataFound == false) {
                                        reportData[1].data.push(response.response);
                                    }
                                    changeButtonText('Pickpup Success');
                                } else {
                                    for (let i = 0; i < reportData[3].data.length; i++) {
                                        if (reportData[3].data[i].deliveryId == responseId) {
                                            isDataFound = true;
                                            break;
                                        }
                                    }
                                    if (isDataFound == false) {
                                        reportData[3].data.push(response.response);
                                    }
                                    changeButtonText(response.response.failureReason);
                                }
                                disableButton(true);
                                title = response.response;
                                let i = 0;
                                for (i = 0; i < reportData[5].data.length; i++) {
                                    if (title.deliveryId == reportData[5].data[i].deliveryId) {
                                        break;
                                    }
                                }
                                if (reportData[5].data.length > 0 && i < reportData[5].data.length) {
                                    reportData[5].data.splice(i, 1);
                                }
                            } else if (response.status == '0000') {
                                changeButtonText(response.message);
                                setTimeout(() => {
                                    changeButtonText('Submit')
                                }, 5000);
                            } else if (response.status == '1111') {
                                if (title.service == "Delivery") {
                                    let i = 0
                                    for (i = 0; i < reportData[4].data.length; i++) {
                                        if (title.deliveryId == reportData[4].data[i].deliveryId) {
                                            break;
                                        }
                                    }
                                    if (reportData[4].data.length > 0 && i < reportData[4].data.length) {
                                        reportData[4].data.splice(i, 1);
                                    }

                                    reportData[2].data.push(response.response);
                                } else {
                                    let i = 0
                                    for (i = 0; i < reportData[5].data.length; i++) {
                                        if (title.pickUpId == reportData[5].data[i].pickUpId) {
                                            break;
                                        }
                                    }
                                    if (reportData[5].data.length > 0 && i < reportData[5].data.length) {
                                        reportData[5].data.splice(i, 1);
                                    }
                                    reportData[3].data.push(response.response);
                                }
                                title = response.response;
                                changeButtonText(response.message);
                                disableButton(true);
                            }
                            else {
                                changeButtonText('Something Went Wrong');
                                disableButton(true);
                                setTimeout(() => {
                                    changeButtonText('Submit')
                                    disableButton(false);
                                }, 5000);
                            }
                        }
                        catch (e) {
                            processingState(false);
                            changeButtonText('Something Went Wrong')
                            disableButton(true);
                            setTimeout(() => {
                                changeButtonText('Submit')
                                disableButton(false);
                            }, 4000);
                            //console.log(e)
                        }
                        selectedRequest = 0;
                    }
                } style={{ backgroundColor: '#4E0D3A', height: '100%', justifyContent: 'center', width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    {
                        isProcessing ? <Spinner color='#fff' /> : <Text style={{ color: '#fff' }}>
                            {buttonText}
                        </Text>
                    }
                </Button>
            </View>
        </View>
    )
}

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveryData: [],
            pickUpData: [],
            dataLoaded: false
        };

    }

    componentDidMount() {
        try {
            var delivery = firebase.database().ref('delivery');
            delivery.once("value", datasnap => {
                let data = datasnap.val();
                let tmpArray = [];
                for (let key in data) {
                    tmpArray.push(data[key])
                }
                for (let i = 0; i < tmpArray.length; i++) {
                    let j = 0;
                    for (j = 0; j < reportData[4].data.length; j++) {
                        if (tmpArray[i].deliveryId == reportData[4].data[j].deliveryId) {
                            break;
                        }
                    }
                    if (j == reportData[4].data.length) {
                        reportData[4].data.push(tmpArray[i]);
                    }
                }
                this.setState({
                    ...this.state,
                    deliveryData: tmpArray,
                    dataLoaded: true
                })
            })
            var pickUp = firebase.database().ref('pickup');
            pickUp.once("value", datasnap => {
                let pickUpData = datasnap.val();
                let tmpArray = [];
                for (let key in pickUpData) {
                    tmpArray.push(pickUpData[key])
                }
                for (let i = 0; i < tmpArray.length; i++) {
                    let j = 0;
                    for (j = 0; j < reportData[5].data.length; j++) {
                        if (tmpArray[i].deliveryId == reportData[5].data[j].deliveryId) {
                            break;
                        }
                    }
                    if (j == reportData[5].data.length) {
                        reportData[5].data.push(tmpArray[i]);
                    }
                }
                this.setState({
                    pickUpData: tmpArray,
                })
            })
        } catch (e) {
            //console.log('error : ' + e);
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
        if (value == "0") {
            isPickUp = false;
            isDelivery = true;
            isReport = false;
        } else if (value == "1") {
            isDelivery = false;
            isReport = false;
            isPickUp = true;
        } else {
            isDelivery = false;
            isPickUp = false;
            isReport = true;
        }
        selectedRequest = 0;
    }
    render() {
        const { deliveryData, pickUpData, dataLoaded } = this.state;
        return (
            <Container style={styles.container}>
                <View style={styles.head}>
                    <View style={styles.headContent}>
                        <View>
                            <Text style={{ color: '#6A6A6A' }}>
                                {
                                    (isDelivery || isPickUp) ? (isDelivery ? 'Deliveries  ' + deliveryData.length : 'PickUps  ' + this.state.pickUpData.length) : ('Report')
                                }
                            </Text>
                        </View>
                        <Text style={{ color: '#6A6A6A', marginLeft: 'auto' }}>Filter</Text>
                        <View style={{ width: 35, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Picker mode="dropdown" selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}>
                                <Picker.Item label="Delivery" value="0" />
                                <Picker.Item label="PickUp" value="1" />
                                <Picker.Item label="Report" value="2" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.data}>
                    <SafeAreaView>
                        {(isDelivery || isPickUp) ? (dataLoaded ? (<FlatList
                            data={isDelivery ? deliveryData : pickUpData}
                            renderItem={({ item }) => <Item title={item} />}
                            keyExtractor={item => item.deliveryId}
                        />) : <Spinner color='blue' />
                        ) :
                            (<SectionList
                                sections={reportData}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <MySectionList title={item} />}
                                renderSectionHeader={({ section }) => (
                                    <View style={styles.header}>
                                        <View style={styles.headerContent}>
                                            <Text style={{ fontSize: 17, paddingLeft: 15 }}>{section.title}</Text>
                                            <Text style={{ color: '#6A6A6A', paddingRight: 15 }}>
                                                {
                                                    (section.data.length > 0) ? section.data.length : ' Nothing To Show'
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            />)
                        }
                    </SafeAreaView>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5D1049'
    },
    head: {
        backgroundColor: '#fff',
        height: 50,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 3
    },
    headContent: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 25
    },
    data: {
        flex: 1,
        backgroundColor: '#E2E2E2'
    },
    item: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        height: 250,
        justifyContent: 'space-around',
        marginVertical: 5,
        marginHorizontal: 4,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    itemHead: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemBody: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    itemFoot: {
        flex: 2,
        alignItems: 'center',
    },
    picker: {
        width: 10,
        height: 40,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
    },
    pickerItem: {
        color: 'red',
        flex: 1
    },
    header: {
        height: 50,
        marginVertical: 6,
        backgroundColor: '#fff',
    },
    headerContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionItem: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    sectionTitle: {
        fontSize: 24
    }
})

export default HomeScreen;

{/* <View style={{ paddingRight: 5 }}>
                                <Text style={{ color: '#6A6A6A' }}>Filter</Text>
                            </View>
                            <View>
                                <FontAwesomeIcon size={17} icon={faAlignCenter} />
                            </View> */}
