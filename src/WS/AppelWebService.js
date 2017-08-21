const url = 'https://familink.cleverapps.io';

export async function appelGet(lien)
{
  const response = await fetch(`${url}${lien}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function appelPost(lien, data)
{
  const response =  await fetch(`${url}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `${data}`,
  });
  const responseJson = await response.json(lien, data);
  return responseJson;
}

export async function appelDelete(lien, data)
{
  const response =  await fetch(`${url}${lien}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `${data}`,
  });
  const responseJson = await response.json(lien, data);
  return responseJson;
}

export async function appelPut()
{
  const response =  await fetch(`${url}${lien}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `${data}`,
  });
  const responseJson = await response.json();
  return responseJson;
}
