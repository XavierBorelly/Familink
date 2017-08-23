const url = 'https://familink.cleverapps.io';

export async function appelGet(lien, token)
{
  const response = await fetch(`${url}${lien}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token},`,
    },
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function appelPost(lien, data, token)
{
  const response = await fetch(`${url}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token},`,
    },
    body: `${data}`,
  });
  const responseJson = await response.json(lien, data);
  return responseJson;
}

export async function appelDelete(lien, data, token)
{
  const response = await fetch(`${url}${lien}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token},`,
    },
    body: `${data}`,
  });
  const responseJson = await response.json(lien, data, token);
  return responseJson;
}

export async function appelPut(lien, data, token)
{
  console.log(lien);
  console.log(data);
  console.log(token);
  const response = await fetch(`${url}${lien}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: `${data}`,
  });
  const responseJson = await response.json();
  return responseJson;
}
