import { getLocale } from '../../utils/locale';

const fieldLocalEn = {
  name: {
    label: 'Name',
    errorMsgs: {
      required: 'Name is required',
    },
  },
  birthday: {
    label: 'Birthday',
    errorMsgs: {
      required: 'Birthday is required',
    },
  },
  street: {
    label: 'Street',
    errorMsgs: {
      required: 'Street is required',
    },
  },
  city: {
    label: 'City',
    errorMsgs: {
      required: 'City is required',
    },
  },
  phone: {
    label: 'Phone',
    errorMsgs: {
      required: 'Phone is required',
    },
  },
  email: {
    label: 'Email address',
    errorMsgs: {
      required: 'Email address is required',
      pattern: 'Email address is invalid',
    },
  },
  bodypart: {
    label: 'Bodypart',
    errorMsgs: {
      required: 'Bodypart is required',
    },
  },
  comment: {
    label: 'Comment',
  },
};

const fieldLocalDe = {
  name: {
    label: 'Name',
    errorMsgs: {
      required: 'Name darf nicht leer sein',
    },
  },
  birthday: {
    label: 'Gebutsdatum',
    errorMsgs: {
      required: 'Gebutsdatum darf nicht leer sein',
    },
  },
  street: {
    label: 'Straße / Nr.',
    errorMsgs: {
      required: 'Straße / Nr. darf nicht leer sein',
    },
  },
  city: {
    label: 'PLZ / Ort',
    errorMsgs: {
      required: 'PLZ / Ort darf nicht leer sein',
    },
  },
  phone: {
    label: 'Telefon',
    errorMsgs: {
      required: 'Straße / Nr. darf nicht leer sein',
    },
  },
  email: {
    label: 'E-Mail Adresse',
    errorMsgs: {
      required: 'E-Mail Adresse darf nicht leer sein',
      pattern: 'E-Mail Adresse ist nicht gültig',
    },
  },
  bodypart: {
    label: 'Körperstelle',
    errorMsgs: {
      required: 'Körperstelle darf nicht leer sein',
    },
  },
  comment: {
    label: 'Anmerkungen',
  },
};

const locale = getLocale();
const fieldLocals = { de: fieldLocalDe, en: fieldLocalEn };

export default formFields = [
  {
    id: 'name',
    type: 'input',
    value: null,
    label: fieldLocals[locale].name.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].name.errorMsgs.required },
    },
  },
  {
    id: 'birthday',
    type: 'input',
    value: null,
    label: fieldLocals[locale].birthday.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].birthday.errorMsgs.required },
    },
  },
  {
    id: 'street',
    type: 'input',
    value: null,
    label: fieldLocals[locale].street.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].street.errorMsgs.required },
    },
  },
  {
    id: 'city',
    type: 'input',
    value: null,
    label: fieldLocals[locale].city.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].city.errorMsgs.required },
    },
  },
  {
    id: 'phone',
    type: 'input',
    value: null,
    label: fieldLocals[locale].phone.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].phone.errorMsgs.required },
    },
  },
  {
    id: 'email',
    type: 'input',
    value: null,
    label: fieldLocals[locale].email.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].email.errorMsgs.required },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: fieldLocals[locale].email.errorMsgs.pattern,
      },
    },
  },
  {
    id: 'bodypart',
    type: 'input',
    value: null,
    label: fieldLocals[locale].bodypart.label,
    rules: {
      required: { value: true, message: fieldLocals[locale].bodypart.errorMsgs.required },
    },
  },
  {
    id: 'comment',
    type: 'input',
    multiline: true,
    value: null,
    label: fieldLocals[locale].comment.label,
    rules: {
      required: false,
    },
  },
];
