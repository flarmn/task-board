<template>
  <div class="notification">
    <div class="notification__sign"></div>
    <div class="notification__info">
      <strong class="notification__info-title">{{ notification.title }}</strong>
      <p class="notification__info-text">{{ notification.text }}</p>
    </div>
    <CloseButton @click="$emit('remove', notification.id)" />
  </div>
</template>

<script>
import CloseButton from '@/components/UI/CloseButton.vue';
export default { props: { notification: Object }, components: { CloseButton } };
</script>

<style scoped>
.notification {
    display: flex;
    background: #FFFFFF;
    color: white;
    padding: 10px;
    padding-left: 0;
    border: 1px solid #E3E5E8;
    border-left: 8px solid #22C33D;
    border-radius: 4px;
    height: 76px;
    width: 400px;
    color: #1C2530;

    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 584;
    font-size: 14px;
    line-height: 125%;
    letter-spacing: 1%;
    vertical-align: middle;
    box-shadow: 0px 8px 16px 0px #0000000F;
    box-shadow: 0px 8px 8px 0px #00000014;
}

.notification__sign {
    height: 100%;
    width: 56px;
    background: url("@/assets/notification_icon.png") no-repeat center top;
    background-size: 24px;
}

.notification__info {
    width: 370px;
    height: 100%;
}

.notification__info-title {
    font-weight: 584;
    font-size: 14px;
    line-height: 125%;
    letter-spacing: 0%;
    vertical-align: middle;
}

.notification__info-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0%;
    vertical-align: middle;
    max-height: 54px;
    overflow-y: hidden;
    margin-top: 8px;
}
</style>
