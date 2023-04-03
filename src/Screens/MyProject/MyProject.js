import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EmailComponent from '../../Component/EmailComponent';
import {imageConstatnt} from '../../helper/imageConstatnt';
import {hp, wp} from '../../helper/primaryConstant';

const MyProject = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.mainView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.imageDotStyle} source={imageConstatnt.back} />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>HIIT cardio workout</Text>
      </View>
      <View style={styles.imageView}>
        <ImageBackground
          source={imageConstatnt.fittnes}
          style={styles.imageView}>
          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.72)']}>
            <View style={styles.$60View}>
              <LinearGradient
                colors={['rgba(41, 146, 243, 1)', 'rgba(13, 227, 215, 1)']}
                start={{x: 0.4, y: 0.7}}
                end={{x: 0.8, y: 0}}
                style={styles.$textView}>
                <Text style={styles.$text}>$60</Text>
              </LinearGradient>
            </View>
            <View
              style={{
                marginTop: hp(11.82),
                marginLeft: wp(5.06),
              }}>
              <Text style={styles.hiitTextStyle}>HIIT cardio workout</Text>
            </View>
            <View style={styles.calendarView}>
              <View style={{flexDirection: 'row', marginTop: hp(0.93)}}>
                <Image
                  source={imageConstatnt.calendar}
                  style={{height: hp(2.04), width: wp(4), tintColor: '#FAFAFA'}}
                />
                <Text style={styles.janTextStlye}>Jan 6, 2022</Text>
                <Text
                  style={{
                    marginLeft: wp(1.86),
                    color: 'rgba(250, 250, 250, 0.7)',
                  }}>
                  |
                </Text>
                <Text style={styles.timeText}>07:00</Text>
              </View>
              <View style={styles.oneTimeView}>
                <Text
                  style={{
                    color: 'rgba(250, 250, 250, 1)',
                    fontWeight: '500',
                    fontSize: 12,
                  }}>
                  ONE-TIME
                </Text>
              </View>
            </View>
            <View style={styles.imglabView}>
              <View style={{flexDirection: 'row', marginTop: hp(0.86)}}>
                <Image source={imageConstatnt.true} style={styles.truestyle} />
                <Text style={styles.comTextStyle}>Completed</Text>
              </View>
              <Text style={styles.dateStyle}>On Feb 6, 2022</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.desView}>
        <Text style={styles.desTextStyle}>Description</Text>
        <Text style={styles.loremTextStyle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard.
        </Text>
      </View>
      <View style={styles.buttView}>
        <View style={styles.detailView}>
          <View>
            <Text style={styles.headerView}>NO. OF BOOKINGS</Text>
            <Text style={styles.numberStyle}>15</Text>
          </View>
          <Text
            style={{color: 'rgba(255, 255, 255, 0.15)', marginTop: hp(1.23)}}>
            |
          </Text>
          <View>
            <Text style={styles.headerView}>CLASS EARNINGS</Text>
            <Text style={styles.numberStyle}>$300</Text>
          </View>
          <Text
            style={{color: 'rgba(255, 255, 255, 0.15)', marginTop: hp(1.23)}}>
            |
          </Text>
          <View>
            <Text style={styles.headerView}>TOTAL TIMER</Text>
            <Text style={styles.numberStyle}>12:00</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.ViewWorkOut}
          onPress={() => {
            navigation.navigate('ZumbaClass');
          }}>
          <Text>View workout timer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.parTextView}>
        <Text style={styles.parText}>Participants</Text>
        <TouchableOpacity>
          <Text style={styles.emailText}>Email All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.componentView}>
        <EmailComponent text={'Alex Stewart'} />
        <EmailComponent text={'Cesar Stoltenberg'} />
        <EmailComponent text={'Jan Tremblay'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031A1C',
  },
  mainView: {
    height: hp(10.83),
    flexDirection: 'row',
    paddingLeft: wp(6.08),
  },
  imageDotStyle: {
    marginTop: hp(7.26),
    height: hp(2.5),
    width: wp(2.9),
  },
  headerTextStyle: {
    marginTop: hp(6.89),
    marginLeft: wp(20.88),
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  imageView: {
    width: wp(100),
    height: hp(31.4),
  },
  $textView: {
    elevation: 20,
    shadowColor: '#fff',
    marginTop: hp(3.44),
    height: hp(5.04),
    width: wp(16.26),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(41, 146, 243, 1)',
    borderTopLeftRadius: hp(1),
    borderBottomLeftRadius: hp(1),
  },
  $text: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  $60View: {
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  hiitTextStyle: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '700',
    fontSize: 20,
  },
  calendarView: {
    flexDirection: 'row',
    marginLeft: wp(5.46),
    justifyContent: 'space-between',
  },
  janTextStlye: {
    marginLeft: wp(1.73),
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginTop: hp(0.29),
  },
  timeText: {
    marginLeft: wp(1.86),
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: hp(0.29),
  },
  oneTimeView: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    height: hp(2.95),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(115, 97, 97, 0.6)',
    borderWidth: 1,
    borderRadius: 6,
    marginRight: wp(5.33),
    alignSelf: 'flex-end',
  },
  imglabView: {
    marginTop: hp(1.1),
    backgroundColor: 'rgba(54, 165, 105, 0.7)',
    height: hp(3.94),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  truestyle: {
    height: hp(2.21),
    width: wp(4.8),
    tintColor: 'white',
    marginLeft: wp(5.33),
  },
  comTextStyle: {
    marginLeft: wp(1.06),
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  dateStyle: {
    marginTop: hp(0.86),
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
    marginRight: wp(5.33),
  },
  desView: {
    marginTop: hp(1.84),
    marginLeft: wp(3.2),
    backgroundColor: '#1A2C2D',
    height: hp(14.77),
    width: wp(93.6),
    borderRadius: 10,
  },
  desTextStyle: {
    marginTop: hp(1.35),
    marginLeft: wp(4.26),
    color: 'rgba(148, 175, 174, 1)',
    fontSize: 16,
    fontWeight: '700',
  },
  loremTextStyle: {
    marginTop: hp(0.73),
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(242, 242, 242, 1)',
    marginLeft: wp(4.26),
    marginRight: wp(6.13),
    width: wp(83.2),
    lineHeight: 23,
  },
  buttView: {
    marginTop: hp(2.09),
    marginLeft: wp(3.2),
    backgroundColor: '#1A2C2D',
    height: hp(12.31),
    width: wp(93.6),
    borderRadius: 10,
  },
  detailView: {
    height: hp(5.91),
    width: wp(81.33),
    marginTop: hp(2.46),
    marginLeft: wp(5.06),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerView: {
    color: 'rgba(163, 183, 186, 1)',
    fontSize: 11,
    fontWeight: '500',
  },
  parTextView: {
    marginTop: hp(5.54),
    marginLeft: wp(4.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberStyle: {
    color: 'rgba(33, 210, 161, 1)',
    fontWeight: '700',
    fontSize: 20,
    marginTop: hp(0.86),
  },
  ViewWorkOut: {
    height: hp(4.92),
    width: wp(45.06),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: hp(1),
    marginTop: hp(1.47),
    backgroundColor: 'rgba(33, 210, 161, 1)',
  },
  parText: {
    color: 'rgba(148, 175, 174, 1)',
    fontSize: 16,
    fontWeight: '600',
  },
  emailText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: wp(6.4),
    color: 'rgba(189, 255, 40, 1)',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
  componentView: {
    marginTop: hp(1.47),
  },
});

export default MyProject;
