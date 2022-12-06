import {View, Text, StyleSheet} from 'react-native'
import { RadioButton } from 'react-native-paper';


const RadioButtons = () => {
    return (
    <View style={styles.radios}>
        <View style={styles.buttons}>
            <RadioButton
                value="daily"
                status={ checked === "daily" ? 'checked' : 'unchecked' }
                onPress={() => setChecked('daily')}
            />
            <Text style={{marginTop:9}}>Daily</Text>
        </View>
        <View style={styles.buttons}>
            <RadioButton
                value="weekly"
                status={ checked === "weekly" ? 'checked' : 'unchecked' }
                onPress={() => setChecked('weekly')}
            />
            <Text style={{marginTop:9}}>Weekly</Text>
        </View>
        <View style={styles.buttons}>
            <RadioButton
                value="bi-weekly"
                status={ checked === "bi-weekly" ? 'checked' : 'unchecked' }
                onPress={() => setChecked('bi-weekly')}
            />
            <Text style={{marginTop:9}}>Bi-weekly</Text>
        </View>
        <View style={styles.buttons}>
            <RadioButton
                value="monthly"
                status={ checked === "monthly" ? 'checked' : 'unchecked' }
                onPress={() => setChecked('monthly')}
            />
            <Text style={{marginTop:9}}>Monthly</Text>
        </View>
    </View>
    )
}

export default RadioButtons


const styles = StyleSheet.create({
    radios: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        display:'flex',
        flexDirection:'row',
    }
});
