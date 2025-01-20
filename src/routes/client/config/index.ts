export const clientFormat = [
    [
        {
            attribute: 'firstname',
            editable: true,
            type: 'string',
            validation: {
                required: 'Le prénom est obligatoire',
                minLength: {
                    value: 2,
                    message: 'Le prénom doit contenir au moins 2 caractères',
                },
            },
        },
        {
            attribute: 'lastname',
            editable: true,
            type: 'string',
            validation: {
                required: 'Le nom est obligatoire',
                minLength: {
                    value: 2,
                    message: 'Le nom doit contenir au moins 2 caractères',
                },
            },
        },
    ],
    [
        {
            attribute: 'email',
            editable: true,
            type: 'string',
            validation: {
                required: 'L\'email est obligatoire',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'L\'email n\'est pas valide',
                },
            },
        },
        {
            attribute: 'phone',
            editable: true,
            type: 'string',
            validation: {
                required: 'Le téléphone est obligatoire',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Le téléphone doit contenir 10 chiffres',
                },
            },
        },
    ],
    [
        {
            attribute: 'address',
            editable: true,
            type: 'string',
            validation: {
                required: 'L\'adresse est obligatoire',
            },
        },
    ],
    [
        {
            attribute: 'notes',
            editable: true,
            type: 'string',
            validation: {}, // Pas de validation spécifique pour ce champ
        },
    ],
];
