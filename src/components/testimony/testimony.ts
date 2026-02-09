import { Career, updateCareerPostRequest } from "../../types/career"

interface CareerPostResponse {
  results: Career[]
  next?: string | null
  previous?: string | null
  count?: number
}

export const getCareers = async (): Promise<Career[]> => {
  try {
    const response = await fetch('https://dev.codeleap.co.uk/careers/')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: CareerPostResponse = await response.json()
    
    return data.results || []
  } catch (error) {
    // console.error('Error fetching career posts:', error)
    throw error
  }
}

export const deleteCareer = async (postId: number): Promise<void> => {
  try {
    const response = await fetch(`https://dev.codeleap.co.uk/careers/${postId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to delete post ${postId}: ${response.status} ${response.statusText}\n${errorText}`)
    }    
  } catch (error) {
    // console.error(`Error deleting post ${postId}:`, error)
    throw error
  }
}

export const updateCareer = async (
  postId: number,
  postData: updateCareerPostRequest
): Promise<void> => {
  try {
    const response = await fetch(`https://dev.codeleap.co.uk/careers/${postId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to update post ${postId}: ${response.status} ${response.statusText}\n${errorText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}
