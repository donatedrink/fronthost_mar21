import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { custLogin } from './Common/redux/customerAuthSlice';
import { useNavigate } from 'react-router-dom';
import Logo from './Assets/Amigos.png';
import Image from 'react-bootstrap/Image';
import { clearUserDataDjango } from './Common/redux/settingSlice';
import { useTranslation } from 'react-i18next';
import { changeLang, resetSetting } from './Common/redux/settingSlice';

// const solomon = require('multi_language_number_to_word')
const calendar = require('ethiopian-to-gregorian');

function Login() {
  const dday = new Date().toDateString();
  const [t, i18n] = useTranslation('global');
  const [tday, setTday] = useState(dday.substring(0, 15));

  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);
  const newlangName = langName === 'en' ? 'am' : 'en';

  const customer = useSelector((store) => store.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginForm = (e) => {
    axios
      .post(`${serverIP}lpsauth/login`, {
        username: username,
        password: password,
      })
      .then(function (response) {
        dispatch(custLogin({ responseData: response.data }));
        navigate('/');
      })
      .catch(function (error) {
        console.log('error');
      });
    e.preventDefault();
    
  };


  const changeLanguageBtn = () => {
    i18n.changeLanguage(langName === 'am' ? 'es' : 'en');
    dispatch(
      changeLang({
        langName: newlangName,
      })
    );
  };

  useEffect(() => {
    console.log(customer);
    dispatch(resetSetting())
  }, []);

  return (
    <div className="container">
      <div className="alert alert-light">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
          <div style={{ fontWeight: 'bold' }}> {langName === 'en' ? calendar.getEthiopicDate(29, 12, 2023) + ' ዓ.ም' : tday + ' GC'}</div>
          <div>
            <button onClick={changeLanguageBtn} type="button" style={{ fontWeight: 'bold', padding: 1 }} className="btn btn-outline-light text-dark">
              {t('auth.language')}
            </button>
          </div>
        </div>
      </div>

      <div
        className="row"
        style={{
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="col-sm-1"></div>
        <div
          className="col-sm-5"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image src={Logo} width="200vh" rounded />
        </div>
        <div className="col-sm-5">
          <Card>
            <Card.Header>
              <div>{t('auth.login')}</div>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>{t('auth.username')}</Form.Label>
                  <Form.Control type="text" onChange={(txt) => setUsername(txt.target.value)} placeholder={t('auth.username')} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> {t('auth.password')} </Form.Label>
                  <Form.Control type="password" onChange={(txt) => setPassword(txt.target.value)} placeholder={t('auth.password')} />
                </Form.Group>
              </Form>

              <Button variant="primary" type="submit" onClick={(e) => submitLoginForm(e)}>
                {t('auth.login')}
              </Button>

              {/* <Button variant="primary" type="submit" onClick={() => dispatch(clearUserDataDjango())}>
                DJANGO
              </Button> */}
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
}

export default Login;
