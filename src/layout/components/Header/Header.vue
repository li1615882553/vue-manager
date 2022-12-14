<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<i v-if="!this.$store.getters.sidebarCollapse" class="el-icon-s-fold"></i>
			<i v-else class="el-icon-s-unfold"></i>
		</div>
		<div class="logo">{{ sysTitle }}</div>
		<div class="system-list">
			<div
				v-for="system of subSystems"
				:key="system.path"
				:class="{ 'is-active': curSystem == system.path }"
			>
				<router-link :to="`/${system.path}`">
					<div class="svg-container">
						<Icon
							class="system-icon"
							:icon-class="system.icon"
							:height="35"
							:width="35"
						></Icon>
					</div>
					<span>{{ system.title }}</span>
				</router-link>
			</div>
		</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip
						effect="dark"
						:content="fullscreen ? `取消全屏` : `全屏`"
						placement="bottom"
					>
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<!-- 消息中心 -->
				<div class="btn-bell">
					<el-tooltip
						effect="dark"
						:content="message ? `有${message}条未读消息` : `消息中心`"
						placement="bottom"
					>
						<router-link to="/tabs">
							<i class="el-icon-bell"></i>
						</router-link>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message"></span>
				</div>
				<!-- 用户头像 -->
				<div class="user-avator">
					<img src="../../../assets/user.jpg" />
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ username }}
						<i class="el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<a
							href="https://github.com/li1615882553/vue-manager"
							target="_blank"
						>
							<el-dropdown-item>项目仓库</el-dropdown-item>
						</a>
						<el-dropdown-item divided command="logout">
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				fullscreen: false,
				message: 2,
			};
		},
		inject: ["eventBus"],
		computed: {
			username() {
				return this.$store.getters.userInfo.username;
			},
			subSystems() {
				return (this.$store.state.menu.ywxt || []).filter(
					({ hidden }) => !hidden
				);
			},
			curSystem() {
				return this.$store.getters.curSys;
			},
			sysTitle() {
				return this.subSystems.filter((sys) => sys.path === this.curSystem)[0]
					.title;
			},
		},
		mounted() {
			if (document.body.clientWidth < 1500) {
				this.collapseChage();
			}
		},
		methods: {
			// 用户名下拉菜单选择事件
			handleCommand(command) {
				if (command == "logout") {
					this.$confirm("即将退出系统，是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					})
						.then(() => {
							this.$router.push("/logout");
						})
						.catch(() => {});
				}
			},
			// 侧边栏折叠
			collapseChage() {
				this.$store.dispatch("app/toggleSidebar");
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			},
		},
	};
</script>
<style scoped lang="scss">
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
	}

	.collapse-btn {
		float: left;
		padding: 0 21px;
		cursor: pointer;
		line-height: 70px;
	}

	.header .logo {
		float: left;
		width: 250px;
		line-height: 70px;
	}

	.system-list {
		float: left;
		height: 70px;
		display: flex;
		align-items: center;
		user-select: none;
		cursor: pointer;

		div {
			margin-left: 20px;
			overflow: hidden;

			.svg-container {
				width: 35px;
				margin: auto;
				overflow: hidden;
				margin-bottom: -5px;

				& svg {
					transform: translateX(-35px);
					filter: drop-shadow(35px 0 #eee);
				}
			}

			&:hover .svg-container svg {
				transform: translateX(0px);
			}

			&:hover span {
				color: #1499e0;
			}

			span {
				color: #eee;
			}
		}

		& span {
			font-size: 14px;
		}

		.is-active {
			.svg-container svg {
				transform: translateX(0px);
			}

			span {
				color: #1499e0;
			}
		}
	}

	.header-right {
		float: right;
		padding-right: 50px;
	}

	.header-user-con {
		display: flex;
		height: 70px;
		align-items: center;
	}

	.btn-fullscreen {
		transform: rotate(45deg);
		margin-right: 5px;
		font-size: 24px;
	}

	.btn-bell,
	.btn-fullscreen {
		position: relative;
		width: 30px;
		height: 30px;
		text-align: center;
		border-radius: 15px;
		cursor: pointer;
	}

	.btn-bell-badge {
		position: absolute;
		right: 0;
		top: -2px;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #f56c6c;
		color: #fff;
	}

	.btn-bell .el-icon-bell {
		color: #fff;
	}

	.user-name {
		margin-left: 10px;
	}

	.user-avator {
		margin-left: 20px;
	}

	.user-avator img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.el-dropdown-link {
		color: #fff;
		cursor: pointer;
	}

	.el-dropdown-menu__item {
		text-align: center;
	}
</style>
