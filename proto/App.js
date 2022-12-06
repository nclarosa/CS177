import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, Modal, TextInput} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import Node from './nodes/nodes';
import Legend from './legend';
import { RadioButton } from 'react-native-paper';


export default function App() {

    const [visible, setVis] = useState(false);
    const [frequency, changeFreq] = useState('');
    const [relationship, changeRel] = useState('');
    const [checked, setChecked] = useState("Daily");
    const [name, changeName] = useState('');
    const [vdist, changeV] = useState(5);
    const [hdist, changeH] = useState(50);
    const [nodes, changeNodes] = useState(
    [
        {name: 'Me',
            id: 0,
            bottom: 10,
            rel: 'Main',
            frequency: 'Weekly',
            notes: ''
        },
        {
            id: 1,
            name: 'Dad',
            bottom: 50,
            rel: 'Family',
            frequency: 'Weekly',
            notes: '',
        },
        {
            id: 2,
            name: 'James',
            bottom: 100,
            rel: 'Friend',
            frequency: 'Daily',
            notes: '',
        },
    ]);

    useEffect(() => {
        if(count === nodes.length){
            console.log("count matches length");
            console.log(nodes);
        }
    },[nodes]);

    const [count, updateCount] = useState(3);
      //<Image style={styles.image} source={{uri: "https://i.pinimg.com/564x/72/fc/8f/72fc8f99d2ecbb63647e83af43235b05--personal-progress-geometric-shapes.jpg"}}/>

  return (
  <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('./assets/background.png')}/>
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
            <View style={styles.instructions}>
                <View style={{alignItems:'center'}}>
                    <Text>How close are you? </Text>
                    <Text>(1 = very close, 10 = not very close)</Text>
                </View>
                <Slider
                    value={vdist}
                    minimumValue = {0}
                    maximumValue = {10}
                    onValueChange={(value) => changeV(value)}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={1}
                    trackClickable= {true}
                />
                <Text style={{marginLeft:'47%'}}>{vdist}</Text>
            </View> 
                    <View style={styles.radios}>
                        <Text> Reminder Frequency:</Text>
                        <View style={styles.buttons}>
                            <RadioButton
                                value="Daily"
                                status={ checked === "Daily" ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('Daily')}
                            />
                            <Text style={{marginTop:9}}>Daily</Text>
                        </View>
                        <View style={styles.buttons}>
                            <RadioButton
                                value="Weekly"
                                status={ checked === "Weekly" ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('Weekly')}
                            />
                            <Text style={{marginTop:9}}>Weekly</Text>
                        </View>
                        <View style={styles.buttons}>
                            <RadioButton
                                value="Bi-weekly"
                                status={ checked === "Bi-weekly" ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('Bi-weekly')}
                            />
                            <Text style={{marginTop:9}}>Bi-weekly</Text>
                        </View>
                        <View style={styles.buttons}>
                            <RadioButton
                                value="Monthly"
                                status={ checked === "Monthly" ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('Monthly')}
                            />
                            <Text style={{marginTop:9}}>Monthly</Text>
                        </View>
                    </View>
          <TouchableOpacity onPress={()=>{
                if(name === "Me"){
                    radius = 0;
                }
                changeNodes(nodes => [...nodes,
        {
            id: count,
            name: name,
            bottom: parseInt(vdist) * 10,
            rel: relationship,
            frequency: checked, 
            notes: '',
        }]);
                updateCount(count + 1);
                changeH("");
                changeV("");
                changeRel("");
                changeFreq("");
                changeName("");
                setVis(!visible)}}>
                <Text style={{margin:10}}>save</Text>
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
    width:'100%',
    },
    image: {
    width: 440,
    height: '100%',
    position: 'absolute',
    },
    button: {
    position: 'absolute',
    bottom: '25%',
    right: '5%',
    },
    instructions:{
        height: 50,
        width:'60%',
        justifyContent:'center',
        margin: 40,
    },
    radios: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        display:'flex',
        flexDirection:'row',
    }
});
