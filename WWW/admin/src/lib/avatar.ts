import { createAvatar } from '@dicebear/core'
import * as avatarStyles from '@dicebear/collection'

export function getAvatarImg(username: string) {
	const avatar = createAvatar(avatarStyles.initials, {
		seed: username,
        radius: 30,
	})

	return avatar.toDataUri()
}
