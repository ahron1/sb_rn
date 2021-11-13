import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '20@s',
    paddingVertical: '20@s',
    // justifyContent: 'center',
    // backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '130@s',
    width: '130@s',
    borderRadius: '100@s',
    resizeMode: 'cover',
  },
  itemView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10@s',
    height: '200@s',
  },
  labelText: {
    paddingTop: '5@s',
    fontSize: '20@s',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;