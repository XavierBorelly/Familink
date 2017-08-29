import { urlWs } from '../Util';
import { tokenIsValid } from '../errors/Token';

async function verifToken(response, token, propsNavigation)
{
  if (token !== '' && token !== undefined && token !== null)
  {
    if (tokenIsValid(response.status, propsNavigation))
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
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: `${data}`,
  });

  return verifToken(response, token, propsNavigation);
}

export async function appelPostStatus(lien, data)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `${data}`,
  });

  return response;
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
