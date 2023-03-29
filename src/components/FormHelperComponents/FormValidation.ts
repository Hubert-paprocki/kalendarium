import FormValues from "./FormValuesInterface";

const currentDate = new Date();

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.text) {
    errors.text = "Opis wydarzenia jest wymagany";
  }
  //zakomentować do sprawdzenia starych wydarzeń
  if (!values.date) {
    errors.date = "Wybranie daty jest wymagane";
  } else if (
    currentDate.setHours(0, 0, 0, 0) >
    new Date(values.date).setHours(0, 0, 0, 0)
  ) {
    errors.date = "Nie potrafię cofać się w przeszłość :)";
  }
  //zakomentować do sprawdzenia starych wydarzeń
  return errors;
};

export default validate
