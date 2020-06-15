<template>
   <v-row align="center" justify="center">
		<v-col cols="12" sm="8" md="4">
			<v-card class="elevation-12">
				<v-card-title>
					<h3>登入</h3>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col>
							<v-text-field label="手機號碼" v-model="token"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="text-right">
							<v-btn color="success" @click="onSubmit">
								確認送出
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { LOGIN } from '@/store/actions.type';
export default {
	name: 'LoginView',
	data(){
		return {
			token: '',
			returnUrl: '',
			returnQuery: null
		}
	},
	beforeMount() {
		if(this.$route.query) {
			this.returnUrl = this.$route.query.returnUrl ?  this.$route.query.returnUrl : '';

			let copy = JSON.parse(JSON.stringify(this.$route.query))
			delete copy['returnUrl'];
			this.returnQuery = copy;
		}
	},
	methods: {
      onLoginFailed(){
         Bus.$emit('errors', { msg: '登入失敗' });
      },
		onSubmit() {
			this.$store.dispatch(LOGIN, this.token)
			.then(() => {
				this.onSuccess();          
			}).catch(error => {
				this.onLoginFailed();
			})
		},
      onSuccess(){
         if(this.returnUrl) {
				if(this.returnQuery) this.$router.push({ path: this.returnUrl, query: this.returnQuery });
				else this.$router.push({ path: this.returnUrl });
			} 
         else this.$router.push({ path: '/' });        
      }
   }
}
</script>

<style>

</style>