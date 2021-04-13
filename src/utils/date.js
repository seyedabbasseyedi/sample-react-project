import moment from 'jalali-moment';

const convertDateToJalali = (date) => {
    if (!date) {
        return "";
    } else {
        let newDate = new Date(date);
        let persianDate = moment(newDate).locale('fa').format('YYYY/M/DD HH:mm');
        return persianDate;
    }
}

export default convertDateToJalali;