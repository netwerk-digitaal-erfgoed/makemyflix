<template>
  <div class="cta">
    <div class="container">
      <div class="benefits">
        <div class="content">
          <div class="subheader">Recent gelanceerd project</div>
          <div class="header">Door die verbindingen het publiek bereiken met de kernboodschap</div>
          <DevOnly>
            <ul class="flix-list">
              <li
                v-for="flix in flixes"
                :key="flix.title">
                <router-link :to="flix.path">
                  {{ flix.title }}
                </router-link>
              </li>
            </ul>
          </DevOnly>
        </div>
        <div class="items">
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:format-list-checks"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Check de endpoints</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:pencil-outline"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Personaliseren</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:autorenew"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Genereer je Flix</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:monitor-share"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Bekijk en delen</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="prompt">
        <h2>
          Maak direct<br />
          je eigen flix
        </h2>
        <AtomsButton
          type="link"
          to="/create"
          class="create-btn"
          >START NU
        </AtomsButton>
      </div>
      <div class="footer">
        <div>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <AtomsLogo />
          </a>
        </div>
        <div class="name">HeritageFlix</div>
        <div class="socials">
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:email" />
          </a>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:facebook" />
          </a>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:instagram" />
          </a>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:phone" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore();
const flixStore = useFlixStore();

const flixes = await flixStore.fetchFlixes();

// Clear seo from any previous selected flixes
useSetSeo();

onMounted(() => {
  themeStore.resetData();
});
</script>

<style lang="scss" scoped>
.flix-list {
  margin-top: var(--space-4);
  padding-left: var(--space-4);

  a {
    color: var(--primary-color);

    &:hover {
      text-decoration: underline;
    }
  }
}

.cta {
  padding: 0 var(--space-6);
  min-height: 100vh;

  @media (min-width: 48em) {
    padding: 0 var(--space-12);
  }

  @media (min-width: 80em) {
    padding: 0 var(--space-20);
  }

  background-color: var(--secondary-color);
  color: var(--primary-color);

  .container {
    max-width: var(--container);
    margin: 0 auto;
  }

  .benefits {
    padding: var(--space-10) 0 var(--space-5);
    display: grid;
    gap: var(--space-8);

    @media (min-width: 48em) {
      padding: var(--space-20) 0 var(--space-10);
      grid-template-columns: 1fr 2fr;
    }

    @media (min-width: 80em) {
      padding: var(--space-40) 0 var(--space-20);
    }

    .subheader {
      font-size: var(--font-size-sm);
      color: #dadada; // TODO: use css var
      margin-bottom: var(--space-8);
    }

    .header {
      font-size: var(--font-size-xl);
      text-wrap: balance;
    }

    .items {
      display: grid;
      gap: var(--space-8);
      justify-content: center;

      @media (min-width: 48em) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--space-3);

      @media (min-width: 48em) {
        gap: var(--space-6);
      }

      .icon {
        color: var(--blues-blue);
      }

      h3 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-4);

        @media (min-width: 80em) {
          font-size: var(--font-size-2xl);
        }
      }

      p {
        font-size: var(--font-sm);

        @media (min-width: 80em) {
          font-size: var(--font-size-base);
        }
      }
    }
  }

  .prompt {
    text-align: center;
    padding: var(--space-20) 0;

    h2 {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);

      @media (min-width: 48em) {
        font-size: var(--font-size-8xl);
      }
    }

    .create-btn {
      margin-top: var(--space-16);
    }
  }

  .footer {
    display: grid;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    padding: 0 0 var(--space-10);

    @media (min-width: 48em) {
      justify-content: initial;
      height: var(--space-29);
      grid-template-columns: var(--space-40) 1fr var(--space-40);
      padding: initial;
    }

    .name {
      text-align: center;
      font-size: var(--font-size-lg);
      order: -1;

      @media (min-width: 48em) {
        order: initial;
      }
    }

    .socials {
      display: flex;
      align-items: center;
      gap: var(--space-6);

      a {
        display: block;
        color: var(--primary-color);
      }
    }
  }
}
</style>
