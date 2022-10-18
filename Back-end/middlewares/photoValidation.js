const { body } = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O titulo e obrigatorio.")
            .isString(0)
            .withMessage("O titulo e obrigatorio.")
            .isLength({min: 3})
            .withMessage("O titulo precisa ter no minimo 3 caracteres"),
        body("image").custom((value, {req}) => {
            if(!req.file){
                throw new Error("A imagem e obrigatoria");
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O titulo e obrigatorio")
            .isLength({min: 3})
            .withMessage("O titulo precisa ter no minimo 3 caracteres"),
    ]
};

const commentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("O comentario e obrigatorio")
    ];
};

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
}