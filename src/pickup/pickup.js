import moment from 'moment';
var initialDate = moment();
//var pickUpData = [];
var pickUpData = [
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081001',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(3, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081002',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(6, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081003',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(9, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081004',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(12, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081005',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(15, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081006',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(18, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081007',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(21, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081008',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(24, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081009',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(27, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081010',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.add(30, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081011',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(7, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081012',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(14, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081013',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(21, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081014',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(28, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081015',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(35, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081016',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(41, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081017',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(48, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081018',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(55, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081019',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(52, 'm').toISOString(),
        failureReason: ''
    },
    {
        service: 'PickUp',
        pickUpId: 'PID20032020081020',
        Address: {
            houseNo: '7th floor, Sec-59',
            fullName: 'Rohit Sinha',
            mobileNo: '9570453145',
            pinCode: '112011',
            city: 'Gurgaon',
            locality: 'Capital Cyberscape',
            state: 'Haryana'
        },
        status: 'TBP',
        price: '100',
        date: initialDate.subtract(59, 'm').toISOString(),
        failureReason: ''
    }    
]

export default pickUpData;