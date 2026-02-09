import { Career, CreateCareerPostRequest } from "../../types/career"

export const createCareer = async (postData: CreateCareerPostRequest): Promise<Career> => {
  try {
    const response = await fetch('https://dev.codeleap.co.uk/careers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating career post:', error)
    throw error
  }
}