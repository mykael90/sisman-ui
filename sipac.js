const x = {
  id: 'SIPAC',
  name: 'SIPAC',
  type: 'oauth',
  authorization: 'https://autenticacao.info.ufrn.br/authz-server/oauth/authorize',
  token: 'https://autenticacao.info.ufrn.br/authz-server/oauth/token',
  userinfo: 'https://kapi.kakao.com/v2/user/me',
  profile(profile) {
    return {
      id: profile.id,
      name: profile.kakao_account?.profile.nickname,
      email: profile.kakao_account?.email,
      image: profile.kakao_account?.profile.profile_image_url
    };
  }
};
