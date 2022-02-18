export const getCurrentDateString = ({onlyYear, withTZ}:{onlyYear: boolean, withTZ?: boolean}): string => {
    if (onlyYear){
        return (new Date()).getFullYear().toString();
    } else {
        let dateString = (new Date()).getFullYear().toString();
        dateString += '-' +
        (((new Date()).getMonth() + 1) < 10 
            ? '0' + ((new Date()).getMonth() + 1).toString() 
            : ((new Date()).getMonth() + 1).toString());
        dateString += '-' +
        (((new Date()).getDate() + 1) < 10 
            ? '0' + ((new Date()).getDate() + 1).toString() 
            : ((new Date()).getDate() + 1).toString());
        return withTZ ? dateString + 'T00:00:00Z': dateString;
    }
};