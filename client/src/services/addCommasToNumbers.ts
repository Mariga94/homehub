const addCommasToNumbers = (price: number): string => {
    const numberString = price.toString();

    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber
}

export { addCommasToNumbers }