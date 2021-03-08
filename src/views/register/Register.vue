<template>
  <div>
    <div class="login">
      <img
        src="http://www.dell-lee.com/imgs/vue3/user.png"
        class="login__img"
      />
      <div>
        <input
          type="text"
          class="login__username"
          placeholder="请输入手机号"
          v-model="username"
        />
      </div>
      <div>
        <input
          type="text"
          class="login__password"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="text"
          class="login__password"
          placeholder="确认密码"
          v-model="checkPasd"
        />
      </div>

      <button class="login__btn" @click="handleClick">注册</button>
      <div class="login__register" @click="handlBack">已有账号登陆</div>
    </div>
    <Mask v-show="show.isShow" :message="show.mes" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Mask from "../../components/Mask";
export default {
  setup() {
    const router = useRouter();
    const show = reactive({ isShow: false, mes: "" });
    const data = reactive({
      username: "admin",
      password: 123,
      checkPasd: 123,
    });
    // 点击登陆
    const handleClick = async () => {
      try {
        const { data } = await post("/api/user/register", data);
        if (data.errno === 0) {
          show.isShow = true;
          window.localStorage.setItem("key", 123);
          show.mes = "注册成功";
          setTimeout(() => {
            show.isShow = false;
            router.push("/login");
          }, 2000);
        }
      } catch (e) {
        show.isShow = true;
        show.mes = "请求失败";
      }
    };
    // 点击注册
    const handleRegis = () => {
      router.push({ name: "Register" });
    };
    //已有账号登陆
    const handlBack = () => {
      router.push("/login");
    };

    const { username, password, checkPasd } = toRefs(data);
    return {
      username,
      password,
      checkPasd,
      handleClick,
      show,
      handleRegis,
      handlBack,
    };
  },
  components: {
    Mask,
  },
};
</script>

<style lang="scss" scope>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 3.16rem;
  text-align: center;
  &__img {
    width: 0.66rem;
    height: 0.66rem;
  }
  &__username,
  &__password {
    box-sizing: border-box;
    width: 2.95rem;
    height: 0.48rem;
    font-size: 0.16rem;
    padding-left: 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    outline: none;
  }
  &__btn {
    width: 2.95rem;
    height: 0.48rem;
    color: #ffffff;
    font-size: 0.16rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border: none;
    outline: none;
  }
  &__register {
    margin-top: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.14rem;
  }
}
</style>