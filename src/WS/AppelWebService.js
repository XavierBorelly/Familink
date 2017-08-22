import { urlWs } from '../Util';
import { tokenInvalide } from '../error/Token';

export async function appelGet(lien, token, propsNavigation)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token},`,
    },
  });

  if (token !== '' || token !== undefined || token !== null)
  {
    if (tokenInvalide(response.status, propsNavigation))
    {
      const responseJson = await response.json();
      return responseJson;
    }
    return null;
  }
  const responseJson = await response.json();
  return responseJson;
}

export async function appelPost(lien, data, token, propsNavigation)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token},`,
    },
    body: `${data}`,
  });

  if (token !== '' || token !== undefined || token !== null)
  {
    if (tokenInvalide(response.status, propsNavigation))
    {
      const responseJson = await response.json();
      return responseJson;
    }
    return null;
  }
  const responseJson = await response.json();
  return responseJson;
}

export async function appelDelete(lien, data, token, propsNavigation)
{
  const response = await fetch(`${urlWs}${lien}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token},`,
    },
    body: `${data}`,
  });

  if (token !== '' || token !== undefined || token !== null)
  {
    if (tokenInvalide(response.status, propsNavigation))
    {
      const responseJson = await response.json();
      return responseJson;
    }
    return null;
  }
  const responseJson = await response.json();
  return responseJson;
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

  if (token !== '' || token !== undefined || token !== null)
  {
    if (tokenInvalide(response.status, propsNavigation))
    {
      const responseJson = await response.json();
      return responseJson;
    }
    return null;
  }
  const responseJson = await response.json();
  return responseJson;
}
