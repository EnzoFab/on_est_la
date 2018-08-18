module.exports = {
    /* Parse parameters labels from database to Sequelize models */
    parseRawQuery (data) {
        let answer = [];
        for (let qUser of data){
            let mUser = {
                userId: qUser.user_id,
                userFirstname: qUser.user_firstname,
                userName: qUser.user_name,
                userDateInscription: qUser.user_date_inscription,
                userPass: qUser.user_pass,
                userMail: qUser.user_mail,
                userToken: qUser.user_token,
                userPhone: qUser.user_phone,
                userPseudo: qUser.user_pseudo,
                userDescription: qUser.user_description,
                userVisibility: qUser.user_visibility,
                userPicture: qUser.user_picture
            };
            answer.push(mUser)
        }
        return answer
    },

    validMailPassword(user) {
        const validEmail = typeof user.userMail === 'string' && user.userMail.trim() !== "";
        const validPassword = typeof user.userPass === 'string' && user.userPass.trim() !== "" && user.userPass.trim().length >= 6;
        return validEmail && validPassword;
    }
}