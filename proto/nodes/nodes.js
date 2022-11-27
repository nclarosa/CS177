import { useEffect, useState } from 'react';
import { Animated, View, Modal, StyleSheet, Text, TouchableOpacity, Easing, TextInput} from 'react-native';

const Node = (props) => {

    const [visible, changeVis] = useState(false);
    const [frequency, changeDisplayedFreq] = useState(props.offset.frequency);
    const left = props.offset.left;
    const bottom = props.offset.bottom;
    let color = 'cyan';
    switch (props.offset.rel){
    case 'Family':
        color = 'red';
        break;
    case 'Friend':
        color = 'green';
        break;
    case 'Coworker':
        color = 'blue';
        break;
    case 'Main':
        color = 'yellow';
        break;
    }

    const styleOverride = {
        backgroundColor: color,
    }
    
    const animation = new Animated.Value(0); 

    useEffect(() => {
        if(props.offset.id !== 0){
            moving();
        }
    },[animation]);

    let radius = Math.sqrt(left**2 + bottom**2);
    if(props.offset.id === 0){
        radius = 0;
    }

    let snapshot = 50;
        /// translateX
        let inputRange = [], outputRange = [];
        for (let i=0; i<=snapshot; ++i) {
            let value = i/snapshot;
            let move = Math.sin(value * Math.PI * 2) * radius;
            inputRange.push(value);
            outputRange.push(move);
        }
        let translateX = animation.interpolate({ inputRange, outputRange });

        /// translateY
        inputRange = [], outputRange = [];
        for (let i=0; i<=snapshot; ++i) {
            let value = i/snapshot;
            let move = -Math.cos(value * Math.PI * 2) * radius;
            inputRange.push(value);
            outputRange.push(move);
        }
        let translateY = animation.interpolate({ inputRange, outputRange });




    const moving = () => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 8000 + Math.random() * 10000,
                useNativeDriver: false,
                easing: Easing.linear,
            }),
        ).start();
    }
    let transform = [{ translateY: translateY }, {translateX:translateX}];

    return(
        <Animated.View style={[styles.container, {transform}, {zIndex: props.offset.id}]}>
            <TouchableOpacity onPress={() => changeVis(!visible)}>
                <Text style={styles.text}>{props.offset.name}</Text>
                <View style={[styles.node, styleOverride] }>
                </View>
            </TouchableOpacity>
            <Modal visible={visible} animationType='slide' transparent='true'>
                <View style={[styles.modal, {backgroundColor: color}] }>
                    <Text> Orbit currently reminds you to reach out to {props.offset.name} {frequency}!</Text>
                    <View>
                    <Text> Type below to change the reminder frequency:</Text>
                    <TextInput 
                    style={styles.input}
                    placeholder="daily, weekly, bi-weekly, or monthly"
                    onChangeText={changeDisplayedFreq}
                    value={frequency}
                    />
                    <TouchableOpacity onPress={() => props.offset.frequency = frequency}>
                    <Text style={{backgroundColor: 'white'}}>Save Changes</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => changeVis(!visible)}>
                    <Text style={{backgroundColor: 'grey'}}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Animated.View>
    )
}


export default Node;

const styles = StyleSheet.create({
    container: {
        height:100,
        width:100,
        zIndex:2,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
    },
    node: {
        borderWidth: 2,
        height: 30,
        width: 30,
        borderRadius: 30,
        zIndex:2,
    },
    text:{
        fontSize: 15,
    },
    input: {
        height: 30,
        width: '40%',
        margin: 12,
        borderWidth: 1,
      },
    modal: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: '20%',
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%'
    }
    }
)
