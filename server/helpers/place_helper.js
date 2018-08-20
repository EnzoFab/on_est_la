module.exports = {
    /* Compute the good material icons */
    computeMaterialIcon (req, data) {
        let placesId = req.body.frequentedPlaces
        for (let place of data){
            if (placesId.indexOf(place.dataValues.placeId) === -1) {
                place.dataValues.placeIcon = 'directions_run'
                place.dataValues.placeIconColor = 'indigo darken-4'
            } else {
                place.dataValues.placeIcon = 'done_all'
                place.dataValues.placeIconColor = 'success'
                place.dataValues.frequentUser = req.body.frequentations[placesId.indexOf(place.dataValues.placeId)]
            }
        }
        return data
    },

    validMailPassword(user) {
        const validEmail = typeof user.userMail === 'string' && user.userMail.trim() !== "";
        const validPassword = typeof user.userPass === 'string' && user.userPass.trim() !== "" && user.userPass.trim().length >= 6;
        return validEmail && validPassword;
    }
}