import { useEffect, useState } from 'react';
import { Animated, View, Modal, StyleSheet, Text, TouchableOpacity, Easing} from 'react-native';

const Node = (props) => {

    const [visible, changeVis] = useState(false);
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
                <View style={styles.modal}>
                    <Text>hi</Text>
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
    modal: {
        display: 'flex',
        backgroundColor: 'green',
        height: '100%',
        width: '100%',
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20%',
    },
    }
)
