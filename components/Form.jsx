import clsx from 'clsx';
import { useForm, FormProvider, useFormContext, useController } from 'react-hook-form';

const REQUIRED_FIELD = 'Esse campo é obrigatório';

function Form({ children, onSubmit }) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col space-y-3" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

function FormBase({ name, label, children }) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div>
      <div className={clsx('text-sm font-semibold mb-1 text-gray-600', error && '!text-red-400')}>{label}</div>
      <div className={clsx('w-full px-4 py-2 rounded-md border-2 border-gray-200', error && '!border-red-400')}>
        {children}
      </div>
      {error && <div className="text-red-400 text-sm mt-1">{error?.message}</div>}
    </div>
  );
}

function FormSubmit({ className, label }) {
  return (
    <input
      className={clsx(className, 'bg-pink-400 p-3 rounded-lg font-semibold text-white cursor-pointer')}
      type="submit"
      value={label}
    />
  );
}

function FormText({ name, label, defaultValue }) {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue,
    rules: {
      required: REQUIRED_FIELD,
    },
  });

  return (
    <FormBase label={label} name={name}>
      <input {...field} className="w-full outline-none bg-clip-text" />
    </FormBase>
  );
}

function FormEmail({ name, label, defaultValue }) {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue,
    rules: {
      required: REQUIRED_FIELD,
      validate: value => {
        if (!value) return true;

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return true;
        }
        return 'Digite um email válido';
      },
    },
  });

  return (
    <FormBase label={label} name={name}>
      <input {...field} className="w-full outline-none bg-clip-text" />
    </FormBase>
  );
}

function FormPassword({ name, label, defaultValue }) {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue,
    rules: {
      required: REQUIRED_FIELD,
    },
  });

  return (
    <FormBase label={label} name={name}>
      <input {...field} type="password" className="w-full outline-none bg-clip-text" />
    </FormBase>
  );
}

Form.Email = FormEmail;
Form.Password = FormPassword;
Form.Text = FormText;
Form.Submit = FormSubmit;
export default Form;
