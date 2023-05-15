const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export const toArabicNumber = (number) => {
    if ( !number || isNaN(number) ) {
        return;
    }

    return String(number).replace(/[0-9]/g, function(n){
        return arabicNumbers[+n]
    });
}