import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, Modal, TextInput} from 'react-native';
import Node from './nodes/nodes';
import Legend from './legend';

export default function App() {

    const [visible, setVis] = useState(false);
    const [frequency, changeFreq] = useState('');
    const [relationship, changeRel] = useState('');
    const [name, changeName] = useState('');
    const [vdist, changeV] = useState(50);
    const [hdist, changeH] = useState(50);
    const [nodes, changeNodes] = useState(
    [
        {name: 'Me',
            id: 0,
            left: 38,
            bottom: 10,
            rel: 'Main',
            frequency: 'Weekly'
        },
        {
            id: 1,
            name: 'Dad',
            left: 20,
            bottom: 30,
            rel: 'Family',
            frequency: 'Weekly'
        },
        {
            id: 2,
            name: 'James',
            left: 40,
            bottom: 60,
            rel: 'Friend',
            frequency: 'Bi-weekly'
        },
    ]);

    useEffect(() => {
        if(count === nodes.length){
            console.log("count matches length");
            console.log(nodes);
        }
    },[nodes]);

    const [count, updateCount] = useState(3);

  return (
  <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: "https://i.pinimg.com/564x/72/fc/8f/72fc8f99d2ecbb63647e83af43235b05--personal-progress-geometric-shapes.jpg"}}/>
      {nodes.map((node) => {
        return (
                <Node offset={node} key={node.name}/>
        )
      })}
      <TouchableOpacity style={styles.button} onPress={()=> setVis(!visible)}>
        <Text style={{fontSize:75}}>+</Text>
      </TouchableOpacity>
      <Legend/>
      <Modal
      animationType='slide'
      visible={visible}
      transparent={true}
        >
      <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Name"
                onChangeText={changeName}
                value={name}
            />
            <TextInput 
                style={styles.input}
                placeholder="Relationship"
                onChangeText={changeRel}
                value={relationship}
            />
            <TextInput 
                style={styles.input}
                placeholder="emotional closeness"
                value={vdist}
                onChangeText={changeV}
            />
            <TextInput 
                style={styles.input}
                placeholder="physical closeness"
                value={hdist}
                onChangeText={changeH}
            />
              <TextInput 
                style={styles.input}
                placeholder="reminder frequency"
                onChangeText={changeFreq}
                value={frequency}
            />
          <TouchableOpacity onPress={()=>{
                const radius = Math.sqrt(vdist**2 + hdist**2);
                if(name === "Me"){
                    radius = 0;
                }
                changeNodes(nodes => [...nodes,
        {
            id: count,
            name: name,
            left: hdist,
            bottom: parseInt(vdist) + parseInt(radius),
            rel: relationship,
            frequency: frequency
        }]);
                updateCount(count + 1);
                changeH("");
                changeV("");
                changeRel("");
                changeFreq("");
                changeName("");
                setVis(!visible)}}>
                <Text>save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
                changeH("");
                changeV("");
                changeRel("");
                changeFreq("");
                changeName("");
                setVis(!visible)}}>
                <Text>cancel</Text>
          </TouchableOpacity>
          </View>
      </View>
      </Modal>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
    input: {
        height: 30,
        width: '40%',
        margin: 12,
        borderWidth: 1,
      },
    centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    },
    modalContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    width:'100%'
    },
    image: {
    width: 440,
    height: 500,
    position: 'absolute',
    },
    button: {
    position: 'absolute',
    bottom: '25%',
    right: '5%',
    }
});
