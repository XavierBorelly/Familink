import { urlWs } from '../Util';
import { tokenIsValid } from '../errors/Token';


async function getResponseObject(webResponse)
{
  if (typeof webResponse === 'object')
  {
    let data = null;
    const contentType = webResponse.headers.get('Content-Type');
    if (contentType != null && contentType.indexOf('application/json' > -1))
    {
      data = await webResponse.json();
    }

    return {
      ok: webResponse.ok,
      status: webResponse.status,
      data,
    };
  }
  return null;
}

async function verifToken(response, token, propsNavigation)
{
  if (token !== '' && token !== undefined && token !== null)
  {
    if (tokenIsValid(response.status, propsNavigation))
    {
      return getResponseObject(response);
    }
    return getResponseObject(response);
  }
  return getResponseObject(response);
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
