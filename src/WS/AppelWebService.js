import { urlWs } from '../Util';
import { tokenInvalide } from '../errors/Token';

async function verifToken(response, token, propsNavigation)
{
  if (token !== '' || token !== undefined || token !== null)
  {
    if (tokenInvalide(response.status, propsNavigation))
    {
      const responseJson = await response.json();
      return responseJson;
    }
    return '';
  }
  const responseJson = await response.json();
  return responseJson;
}


export async function appelGet(lien, token, propsNavigation)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });

  return verifToken(response, token, propsNavigation);
}

export async function appelPost(lien, data, token, propsNavigation)
{
  console.log(lien);
    console.log(data);
      console.log(token);
        console.log(propsNavigation);
              console.log('----------------');
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: `${data}`,
  });

    console.log(response);
      console.log(token);
        console.log(propsNavigation);
  return verifToken(response, token, propsNavigation);
}

export async function appelDelete(lien, token, propsNavigation)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });

  return verifToken(response, token, propsNavigation);
}

export async function appelPut(lien, data, token, propsNavigation)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: `${data}`,
  });

  return verifToken(response, token, propsNavigation);
}
