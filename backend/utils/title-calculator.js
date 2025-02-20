const titlePlayer = (points) => {
    console.log(points);
    if (points > 0 && points < 1500) {
        return "Iron"
    } else if (points >= 1500 && points < 3500) {
        return "Bronze"
    } else if(points >= 3500 && points < 5000) {
        return "Silver"
    } else if(points >= 5000 && points < 6500) {
        return "Gold"
    } else if(points >= 6500 && points < 9000) {
        return "Platinum"
    } else if(points >= 9000 && points < 12000) {
        return "Diamond"
    } else if(points >= 12000 && points < 15000) {
        return "Ascendant"
    } else if(points >= 15000 && points < 20000) {
        return "Immortal"
    } else if(points >= 20000) {
        return "Radiant"
    }
    return "";
} 
module.exports = titlePlayer