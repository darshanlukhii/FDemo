import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const fontSize = val => RFValue(val, 812);

export const wp = val => widthPercentageToDP(val);

export const hp = val => heightPercentageToDP(val);

export const numberOfTrialScheduleClass = 5;

export const isIOS = Platform.OS === 'ios';

import {Platform} from 'react-native';
