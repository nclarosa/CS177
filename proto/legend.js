import {View, Text, StyleSheet} from 'react-native';


const Legend = () => {
    return (
        <View style={styles.view}>
            <View style={styles.row}>
                <View style={[styles.circle,{backgroundColor:'yellow'}]}></View>
                <Text>You</Text>
            </View>
            <View style={styles.row}>
                <View style={[styles.circle,{backgroundColor:'red'}]}></View>
                <Text>Family</Text>
            </View>
            <View style={styles.row}>
                <View style={[styles.circle,{backgroundColor:'green'}]}></View>
                <Text>Friend</Text>
            </View>
            <View style={styles.row}>
                <View style={[styles.circle,{backgroundColor:'orange'}]}></View>
                <Text>Coworker</Text>
            </View>
            <View style={styles.row}>
                <View style={[styles.circle,{backgroundColor:'cyan'}]}></View>
                <Text>Others</Text>
            </View>
        </View>
    );
}

export default Legend; 

const styles = StyleSheet.create({
    view: {
        height: 195,
        width: 120,
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',
        padding: 5,
        right: 0,
        top: 50,
    },
    circle:{
        borderWidth: 2,
        height: 30,
        width: 30,
        borderRadius: 30,
        marginRight: 3, 
    },
    row: {
        justifyContent:'flex-start',
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
        marginTop: 3,
        marginBottom: 3,
    }
});

