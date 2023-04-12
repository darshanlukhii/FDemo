import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../../Component/Header';
import {fontSize, hp, wp} from '../../helper/primaryConstant';
import {imageConstatnt} from '../../helper/imageConstatnt';
import RazorpayCheckout from 'react-native-razorpay';
import {getUserData} from '../../Component/GetData';
import {useIsFocused} from '@react-navigation/native';

const Payment = () => {
  const isFocused = useIsFocused();
  const [userOldData, setUserOldData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    const get = await getUserData();
    setUserOldData(get._data);
  };

  const payment = action => {
    let amount;
    action == 'starter' ? (amount = '492400') : (amount = '984800');
    var options = {
      description: 'Credits towards consultation',
      image: imageConstatnt.splash,
      currency: 'INR',
      key: 'rzp_test_DRufNF2XgsAf32',
      amount: amount,
      name: userOldData.name,
      prefill: {
        email: userOldData.email,
        contact: '9999999999',
        name: 'Razorpay Software',
        // method: 'card',
      },
      theme: {
        color: '#2F87EC',
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.container}>
      <Header text={'Subscription'} />
      <View style={styles.mainHeaderView}>
        <View style={styles.boxViewStyle}>
          <View style={styles.boxTextView}>
            <Text style={styles.boxTextStyle}>Subscription</Text>
            <Text style={styles.boxTextStyle}>plan of</Text>
            <Text style={styles.boxTextStyle}>your choice</Text>
          </View>
          <View style={{flex: 1}}>
            <Image
              style={styles.boxImageView}
              source={imageConstatnt.backGroundGirl}
            />
          </View>
        </View>
        <View style={styles.planOneView}>
          <Image style={styles.staterView} source={imageConstatnt.starter} />
          <Text style={styles.starterText}>STARTER</Text>
          <View style={styles.firstPlanView}>
            <Text style={styles.twoMonth}>$</Text>
            <Text style={styles.twoMonthPriceText}>60</Text>
            <Text style={styles.twoMonth}>for 2 month</Text>
          </View>
          <TouchableOpacity
            style={styles.firstPlanPriceView}
            onPress={() => {
              payment('starter');
            }}>
            <Text style={{color: 'white'}}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.planOneView}>
          <Image style={styles.staterView} source={imageConstatnt.pro} />
          <Text style={styles.starterText}>PRO</Text>
          <View style={styles.firstPlanView}>
            <Text style={styles.twoMonth}>$</Text>
            <Text style={styles.twoMonthPriceText}>120</Text>
            <Text style={styles.twoMonth}>for 2 month</Text>
          </View>
          <TouchableOpacity
            style={styles.firstPlanPriceView}
            onPress={() => {
              payment('pro');
            }}>
            <Text style={{color: 'white'}}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainHeaderView: {
    justifyContent: 'space-evenly',
    height: hp(80),
  },
  boxViewStyle: {
    height: hp(12),
    width: wp(90),
    borderRadius: hp(1),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#6653D6',
    // marginTop: hp(4),
  },
  boxTextView: {marginLeft: hp(2), alignSelf: 'center'},
  boxTextStyle: {
    fontSize: fontSize(16.5),
    fontWeight: '700',
    color: 'white',
    marginTop: hp(0.2),
  },
  boxImageView: {
    height: hp(12),
    width: wp(40),
    alignSelf: 'flex-end',
    borderTopRightRadius: hp(1),
    borderBottomRightRadius: hp(1),
  },
  planOneView: {
    // marginTop: hp(3),
    width: wp(90),
    alignSelf: 'center',
    height: hp(27),
    backgroundColor: '#F5F3FD',
    borderRadius: hp(1),
  },
  staterView: {
    height: hp(5),
    width: hp(5),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  starterText: {
    color: '#6653D6',
    alignSelf: 'center',
    fontSize: fontSize(13),
    marginTop: hp(1),
  },
  twoMonth: {
    fontSize: fontSize(20),
    alignSelf: 'flex-end',
    marginBottom: hp(1),
    fontWeight: '600',
  },
  twoMonthPriceText: {
    fontSize: fontSize(40),
    fontWeight: '800',
    marginLeft: wp(1),
    marginRight: wp(2),
  },
  firstPlanView: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginLeft: wp(5),
    alignSelf: 'center',
  },
  firstPlanPriceView: {
    alignSelf: 'center',
    backgroundColor: '#6653D6',
    height: hp(4),
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2.5),
    borderRadius: hp(1),
  },
});

export default Payment;
