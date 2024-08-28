import { useState, useEffect } from "react"

const useImage = (fileName: string | undefined) => {
	const [loading, setLoading] = useState(true)
	const [image, setImage] = useState(null)

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await import(`../assets/badges/${fileName}.png`) // change relative path to suit your needs
				setImage(response.default)
			} catch (err) {
				console.log("Error")
			} finally {
				setLoading(false)
			}
		}

		fetchImage()
	}, [fileName])

	return {
		loading,
		image,
	}
}

function Badge(props: { teamName: string | undefined }) {
	const { loading, image } = useImage(props.teamName)
	return <>{loading || !image ? <span>...</span> : <img src={image} alt={props.teamName} />}</>
}
export default Badge
