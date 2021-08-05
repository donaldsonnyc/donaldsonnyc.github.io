import { Link, Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, ready } from '../../store/auth';
import PageWrapper from './page-wrapper';

const LoginPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const user = useSelector((s: Store.AppStore) => s.auth.user);
  
  const onSubmit = (data) => {
    dispatch(loginUser(data, () => dispatch(ready())));
  };

  return (user)
    ? <Redirect to="/channels/@me" />
    : (
    <PageWrapper>
      <div
        style={{ left: '35%'}}
        className="flex items-center absolute justify-center h-screen">
        <form
          style={{width: '478px', height: '408px'}}
          className="rounded-md shadow bg-bg-primary p-8"
          onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="lead">We're so excited to see you again!</p>

          <div className="form-group mt-3">
            <label htmlFor="email" className="uppercase">Email</label>
            {/* TODO: make inputs own components */}
            <input
              id="email"
              type="text"
              {...register('email')}
              className="block w-full h-10 p-2 bg-bg-secondary rounded focus:outline-none" />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="password" className="uppercase">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="block w-full h-10 p-2 bg-bg-secondary rounded focus:outline-none" />
          </div>

          <button className="background bg-primary heading w-full h-11 rounded-md mt-8">Login</button>
          <p className="mt-2">Need an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
      <Particles width="100%" height="100%"/>
    </PageWrapper>
  );
}
 
export default LoginPage;