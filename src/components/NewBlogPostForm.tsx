import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import validate from "./FormHelperComponents/FormValidation";
import {
  fieldClass,
  labelClass,
  errorClass,
} from "./FormHelperComponents/FormStyling";
import { BlogPost } from "../App";

interface NewBlogPostFormProps {
  onSubmit: (values: BlogPost, creationDate: Date) => void;
}

function NewBlogPostForm({ onSubmit }: NewBlogPostFormProps) {
  const currentDateString = new Date().toISOString().substring(0, 10);

  return (
    <Formik
      initialValues={{
        text: "",
        date: currentDateString,
        important: "",
      }}
      validate={validate}
      onSubmit={(values, { resetForm }) => {
        const creationDate = new Date();
        const timezoneOffset = creationDate.getTimezoneOffset();
        const creationDateWithOffset = new Date(
          creationDate.getTime() - timezoneOffset * 60 * 1000
        );
        const newPost = {
          ...values,
          creationDate: creationDateWithOffset.toISOString(),
          id: Date.now(),
        };
        onSubmit(newPost, creationDateWithOffset);
        resetForm();
      }}
    >
      {() => (
        <Form className="flex flex-col md:flex-row gap-x-3 gap-y-4 md:gap-y-6 py-10 px-20 justify-center text-center">
          <div className="">
            <label htmlFor="text" className={labelClass}>
              Opis wydarzenia
            </label>
            <Field
              id="text"
              name="text"
              placeholder="Tekst"
              className={fieldClass}
            />
            <ErrorMessage name="text" component="p" className={errorClass} />
          </div>

          <div className="">
            <label htmlFor="date" className={labelClass}>
              Data wydarzenia
            </label>
            <Field id="date" name="date" type="date" className={fieldClass} />
            <ErrorMessage
              name="date"
              component="p"
              className={errorClass}
            ></ErrorMessage>
          </div>

          <div className="">
            <label className="text-stone-400 p-1 font-semibold flex items-center justify-center gap-2">
              Ważne wydarzenie:
              <Field type="radio" name="important" value="true" />
            </label>
          </div>
          <div className="r">
            <button
              type="submit"
              className="border-2 border-zinc-600 py-2 px-4 rounded-md hover:bg-zinc-600 hover:scale-105 duration-200"
            >
              Dodaj do listy
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewBlogPostForm;
