<template>
	<div class="login-wrap bruce" v-loading="loading">
		<div class="ms-login" v-if="retrieve">
			<div class="title">登录</div>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="0px"
			>
				<el-form-item prop="username">
					<el-input
						type="text"
						v-model="ruleForm.username"
						placeholder="账号"
					></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input
						type="password"
						placeholder="密码"
						show-password
						v-model="ruleForm.pwd"
						@keyup.enter.native="login"
					></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="login">登录</el-button>
			<el-button v-if="false" type="text" @click="retrieve = false"
				>找回密码</el-button
			>
		</div>
	</div>
</template>
  <script>
	export default {
		data: function () {
			return {
				loading: false,
				// 是否是找回密码
				retrieve: true,
				// 输入的账号密码
				ruleForm: {
					username: "",
					pwd: "",
				},
				// 输入框数据验证方式
				rules: {
					username: [{ required: true, message: "请输入账号", trigger: "blur" }],
					pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
				},
			};
		},

		methods: {
			login() {
				if (this.loading) return;
				const that = this;
				const data = this.ruleForm;

				this.$refs.ruleForm.validate().then(() => {
					this.loading = true;
					this.$store
						.dispatch("user/login", data)
						.then(() => {
							that.loading = false;
							that.$router.replace({
								path: "/",
								query: {
									redirect: this.$route.query.redirect || "",
								},
							});
						})
						.catch((err) => {
							that.loading = false;
						});
				});
			},
		},
	};
</script>
  <style scoped>
	/* @import "../assets/style.css";
								      @import "../assets/style.scss"; */
	.login-wrap {
		width: 100%;
		height: 100vh;
		z-index: 100 !important;
	}

	.title {
		font-size: 25px;
		text-align: center;
		color: rgb(73, 73, 77);
		margin-bottom: 10px;
	}

	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 200px;
		height: auto;
		padding: 30px;
		border-radius: 15px;
		background: rgba(250, 250, 250, 0.3);
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		-webkit-animation: fadenum 1.5s ease;
		-moz-animation: fadenum 1.5s ease;
		animation: fadenum 1.5s ease;
	}

	.links {
		position: fixed;
		bottom: 0px;
		width: 100%;
		background: rgba(250, 250, 250, 0.4);
		padding: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		color: #666;
		font-size: 12px;
	}

	a {
		color: #409eff;
		text-decoration: none;
	}

	a:visited {
		color: #409eff;
		text-decoration: none;
	}
</style>