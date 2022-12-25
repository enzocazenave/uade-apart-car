const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const Student = require('../models/Student');

const router = Router();

router.post('/create', [
    check('name', 'El nombre del alumno es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido del alumno es obligatorio.').not().isEmpty(),
    check('dni', 'El DNI del alumno es obligatorio.').not().isEmpty(),
    check('docket', 'El número de legajo del alumno es obligatorio.').not().isEmpty(),
    check('toll', 'El número de telepase del alumno es obligatorio.').not().isEmpty(),
    check('plate', 'El número de patente del vehículo del alumno es obligatorio.').not().isEmpty(),
    fieldValidator
], async(req, res) => {
    const { plate, toll } = req.body;

    try {
        const plateExist = await Student.findOne({ plate });

        if (plateExist) return res.status(400).json({
            ok: false,
            msg: `El vehículo con patente ${ plate } ya está registrado en nuestra base de datos.`
        });

        const tollExist = await Student.findOne({ toll });

        if (tollExist) return res.status(400).json({
            ok: false,
            msg: `El número de telepase ${ toll } ya está registrado en nuestra base de datos.`
        });

        req.body.money = 0.0;
        const student = new Student(req.body);
        await student.save();

        delete student._doc.__v;
        delete student._doc._id;

        res.status(201).json({
            ok: true,
            ...student._doc
        });
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado, por favor contáctate con el administrador.'
        });
    }
});

router.get('/:id', [],
    async(req, res) => {
        const { id } = req.params;

        if (!id) return res.status(404).json({
            ok: false,
            msg: 'Tu número de legajo, DNI o número de patente es obligatorio para realizar la consulta de tu saldo.'
        });

        try {
            const [type, data]  = id.split('_');

            let student;

            if (type == 'dni') {
                student = await Student.findOne({ dni: data });
            } else if (type == 'docket') {
                student = await Student.findOne({ docket: data });
            } else if (type == 'plate') {
                student = await Student.findOne({ plate: data });
            }

            if (!student) return res.status(404).json({
                ok: false,
                msg: 'Tu número de legajo o DNI no está registrado en nuestra base de datos.'
            });

            delete student._doc.__v;

            res.status(200).json({
                ok: true,
                ...student._doc
            });
        } catch(error) {
            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'Ocurrió un error inesperado, por favor contáctate con el administrador.'
            });
        }
    }
);

module.exports = router;