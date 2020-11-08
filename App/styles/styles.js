const React = require('react-native')
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions'

const {StyleSheet} = React

const AVATAR_SIZE = wp(22);
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = hp(40);
const STICKY_HEADER_HEIGHT = wp(20);

const GREEN = '#A6ED8E';

export default {

  // Main Styles

  container: {
    flex: 1,
    alignItems: 'center',
  },

  marginVt: {
    marginVertical: hp(1),
  },

  textInput: {
    height: hp(6),
    width: wp(94),
    borderColor: '#1a1919',
    borderWidth: 1,
    borderRadius: wp(2),
    backgroundColor: '#1a1919',
    fontSize: RF(1.5),
  },

  bodyStyle: {
    flex: 4,
    alignItems: 'center',
  },

  logoScreensMargin: {
    marginHorizontal: wp(3),
    marginTop: hp(10)
  },

  redFullButton: {
    borderRadius: wp(1),
    backgroundColor: 'red',
    height: hp(6),
  },

  textWhiteButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: RF(2),
  },

  appLogoImage: {
    width: wp(70),
    height: wp(30),
  },

  signOut: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5052',
  },

  // Text Colors

  textYellow: {
    color: '#FFC400',
  },

  textRed: {
    color: '#e03a3a',
  },

  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: '#232426',
  },

  textBlue: {
    color: '#51A7FA',
  },

  textGray: {
    color: '#b0b5b1',
  },
};
