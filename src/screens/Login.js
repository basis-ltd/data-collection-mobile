import { View, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import InputButton from '../components/InputButton';
import Input from '../components/Input';

const Login = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <View className='w-full flex-1 flex-col gap-4 items-center justify-center'>
            <Text className='text-center'>Data Collection App</Text>
            <View className='w-[90%] mx-auto flex flex-col gap-4 items-center'>
                <Controller name='telephone' control={control} render={({ field }) => {
                    return (
                        <Input placeholder='Phone Number' onChangeText={(e) => {
                            field.onChange(e);
                        }} />
                    )
                }} />
                <InputButton title='Send OTP' primary onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

export default Login;
