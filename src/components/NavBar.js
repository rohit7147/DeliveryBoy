import React from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTruck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const dropDownValues = ['Pickup', 'Delivery'];
let sharedValue = dropDownValues[0];

class NavBar extends React.Component {
    render() {
        return (
            <Container style={styles.navParent}>
                <View style={styles.navData}>
                    <View>
                        <Text style={{ color: '#FFFFFF', fontSize: 35 }}>Airtel</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>PickUp/Delivery</Text>
                    </View>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon style={{ color: '#FFFFFF' }} size={42} icon={faTruck} />
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    navParent: {
        height: 20,
        backgroundColor: '#5D1049'
    },
    navData: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 25
    }
})

export default NavBar;
