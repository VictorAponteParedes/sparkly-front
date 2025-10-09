import axios from 'axios';

// USA SOLO ESTA PARTE (el JWT completo):
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyNGU3NmIzMS0wNDZiLTQyZjUtOWI3Ny04MGM3MDhkZjE3NzgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1OTk3NDY2MiwiZXhwIjoxNzYwNTc5NDYyfQ.xP6O5SBo03uOOyZ0wavhf4JwTuNe4YNXRhYwNToSfZU";

export const createMeeting = async () => {
    try {
        console.log('Using JWT token:', token);

        const response = await axios.post('https://api.videosdk.live/v2/rooms',
            {},
            {
                headers: {
                    authorization: `${token}`, // Sin "Bearer"
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        const { roomId } = response.data;
        return roomId;
    } catch (error) {
        console.error('Full error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};