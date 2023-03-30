import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import validate from "../FormHelperComponents/FormValidation";
import {
  fieldClass,
  labelClass,
  errorClass,
} from "../FormHelperComponents/FormStyling";
import BlogPost from "./BlogPostInterface";

interface BlogPostItemProps {
  readonly text: string;
  readonly date: string;
  readonly isImportant: boolean;
  readonly creationDate: string;
  readonly id: number;
  readonly onDelete: () => void;
  readonly onEdit: (values: BlogPost) => void;
}

function BlogPostItem({
  text,
  date,
  isImportant,
  creationDate,
  id,
  onDelete,
  onEdit,
}: BlogPostItemProps): JSX.Element {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const creationDateSliced = creationDate.slice(0, 10);
  const creationTimeSliced = creationDate.slice(11, 16);

  const handleDelete = () => {
    onDelete();
  };

  const handleSubmit = (values: BlogPost) => {
    const newBlogPost = { ...values };
    onEdit(newBlogPost);
    setIsEdited(!isEdited);
  };

  let postClasses =
    "p-4 rounded-lg shadow-xl flex flex-col gap-2 flex flex-col justify-between ";
  if (isImportant) {
    postClasses += "bg-red-400/50";
  } else {
    postClasses += "bg-zinc-600";
  }

  return isEdited ? (
    <Formik
      initialValues={{
        id: id,
        creationDate: creationDate,
        text: text,
        date: date,
        important: isImportant.toString(),
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      <Form className={postClasses}>
        <p>id: {id}</p>
        <div className="flex flex-col">
          <label className={labelClass}>Wprowadź nową datę wydarzenia:</label>
          <Field className={fieldClass} name="date" type="date" />
          <ErrorMessage
            name="date"
            component="p"
            className={errorClass}
          ></ErrorMessage>
        </div>
        <div className="border rounded-lg p-2">
          <label className={labelClass}>Wprowadź nowy tekst wydarzenia:</label>
          <Field className={fieldClass} name="text" type="text" />
          <ErrorMessage name="text" component="p" className={errorClass} />
        </div>
        <div className="flex">
          <label className={labelClass}>Data dodania:</label>
          <p className="text-center flex-1">{creationDateSliced}</p>
        </div>
        <div className="flex">
          <label className={labelClass}>Czas dodania:</label>
          <p className="text-center flex-1">{creationTimeSliced}</p>
        </div>
        {!isDeleted && (
          <button
            type="submit"
            className="border rounded-lg py-1 px-2 hover:scale-105 duration-200"
          >
            Zapisz zmiany
          </button>
        )}
      </Form>
    </Formik>
  ) : (
    <li className={postClasses}>
      <p>id: {id}</p>
      <div className="flex flex-col">
        <p>Data wydarzenia:</p>
        {date}
      </div>
      <div className="border rounded-lg p-2">
        <p className="text-center">Tekst wydarzenia:</p>
        {text}
      </div>
      <p>Data dodania:{creationDateSliced}</p>
      <div className="flex">
        <p>Czas dodania:</p>
        <p className="text-center flex-1">{creationTimeSliced}</p>
      </div>
      {!isDeleted && (
        <button
          onClick={() => setIsEdited(!isEdited)}
          className="border rounded-lg py-1 px-2 hover:scale-105 duration-200"
        >
          Edytuj wpis
        </button>
      )}
      {!isDeleted && (
        <button
          className="border rounded-lg py-1 px-2 hover:scale-105 duration-200"
          onClick={handleDelete}
        >
          Usuń wpis
        </button>
      )}
    </li>
  );
}

export default BlogPostItem;
