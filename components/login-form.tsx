import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from './login-form.module.css'
import crypto from 'crypto';

interface Values {
    username: string;
    password: string;
}

const publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/bmwVtr5No01q/ZzV/dZvHV3N\nc1ai3OPL87YlhYTTZlCoZp0tpIXjaFnZ50ueUrVhTyF8ACsc/9xyjr30XDeEjaNB\nuXmaGNhMKoPpuzYbcLWGSxRbp5tuWyXn5V/BvavFbKnLaOyJlwYZtaSoFVdkqq20\n+TNATA6jpR4WLKVd0wIDAQAB\n-----END PUBLIC KEY-----"

export default function LoginForm() {
    return (
      <div className={styles.login_box + ' p-3'}>
        <h1 className="display-6 mb-3">Login</h1>
        <Formik
          initialValues={{
            username: 'meuemail@gmail',
            password: 'secreto',
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              let data = JSON.stringify(values, null, 2)

              console.log(data)

              let encrypted = crypto.publicEncrypt(
                { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(data, 'utf8')
              ).toString('base64');

              console.log(encrypted.toString())
              alert(encrypted.toString())

              setSubmitting(false);
            }, 500);
          }}

        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>

            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Formik>
      </div>
    );
  };
