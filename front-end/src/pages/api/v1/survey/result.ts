import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing credentials' })
    }

    if (req.method === 'POST') {
        const { answers } = req.body

        if (!Array.isArray(answers) || answers.some(a => typeof a.group !== 'string' || typeof a.value !== 'number')) {
            return res.status(400).json({ message: 'Invalid answers format. Expected array of { group, value }' })
        }

        try {
            const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/survey/result`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: token,
                    'x-client-id': userId,
                },
                body: JSON.stringify({ userId, answers }),
            })

            const data = await backendRes.json()
            return res.status(backendRes.status).json(data)
        } catch (err) {
            console.error('Error processing survey result:', err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    if (req.method === 'GET') {
        const { id } = req.query
        console.log('resultId:', id);

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Missing or invalid resultId' })
        }

        try {
            const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/survey/result/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: token,
                    'x-client-id': userId,
                    Accept: 'application/json',
                },
            })

            const data = await backendRes.json()
            return res.status(backendRes.status).json(data)
        } catch (err) {
            console.error('Error fetching survey result:', err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
}
