// This file is customized to mock the Supabase client and redirect requests to our local MySQL database via local API.

class MockQueryBuilder {
  private tableName: string;
  private selects: string = "*";
  private filters: any[] = [];
  private orderCol: string | null = null;
  private orderAsc: boolean = true;
  private limitCount: number | null = null;
  private countOption: string | null = null;
  private isHead: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(fields: string = "*", options?: { count?: string; head?: boolean }) {
    this.selects = fields;
    if (options?.count) this.countOption = options.count;
    if (options?.head) this.isHead = options.head;
    return this;
  }

  insert(data: any) {
    return fetch(`/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({
        action: 'insert',
        table: this.tableName,
        data
      })
    })
    .then(handleResponse);
  }

  eq(column: string, value: any) {
    this.filters.push({ type: 'eq', column, value });
    return this;
  }

  gte(column: string, value: any) {
    this.filters.push({ type: 'gte', column, value });
    return this;
  }

  like(column: string, pattern: string) {
    this.filters.push({ type: 'like', column, value: pattern });
    return this;
  }

  not(column: string, operator: string, value: any) {
    this.filters.push({ type: 'not', column, operator, value });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderCol = column;
    this.orderAsc = options?.ascending !== false;
    return this;
  }

  limit(num: number) {
    this.limitCount = num;
    return this;
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    const promise = fetch(`/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({
        action: 'select',
        table: this.tableName,
        selects: this.selects,
        filters: this.filters,
        orderCol: this.orderCol,
        orderAsc: this.orderAsc,
        limitCount: this.limitCount,
        countOption: this.countOption,
        isHead: this.isHead
      })
    })
    .then(handleResponse);

    return promise.then(onfulfilled, onrejected);
  }
}

function getAuthHeader() {
  const token = localStorage.getItem('be4yougo_session_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errText = await res.text();
    let errMsg = errText;
    try {
      const errJSON = JSON.parse(errText);
      errMsg = errJSON.error || errMsg;
    } catch(e) {}
    return { data: null, error: { message: errMsg } };
  }
  const json = await res.json();
  return { data: json.data, count: json.count, error: null };
}

const listeners = new Set<(event: string, session: any) => void>();

export const supabase = {
  from(tableName: string) {
    return new MockQueryBuilder(tableName);
  },
  auth: {
    async getSession() {
      const token = localStorage.getItem('be4yougo_session_token');
      if (!token) return { data: { session: null }, error: null };
      try {
        const res = await fetch('/api/auth/session', {
          headers: getAuthHeader()
        });
        if (res.ok) {
          const json = await res.json();
          return { data: { session: json.session }, error: null };
        }
      } catch (e) {}
      localStorage.removeItem('be4yougo_session_token');
      return { data: { session: null }, error: null };
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
      listeners.add(callback);
      this.getSession().then(({ data: { session } }) => {
        callback('SIGNED_IN', session);
      });
      return {
        data: {
          subscription: {
            unsubscribe() {
              listeners.delete(callback);
            }
          }
        }
      };
    },

    async signUp(credentials: { email: string; password: string }) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!res.ok) {
        const json = await res.json();
        return { data: null, error: { message: json.error || 'Signup failed' } };
      }
      const json = await res.json();
      localStorage.setItem('be4yougo_session_token', json.token);
      notifyListeners('SIGNED_IN', json.session);
      return { data: { user: json.session.user, session: json.session }, error: null };
    },

    async signInWithPassword(credentials: { email: string; password: string }) {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!res.ok) {
        const json = await res.json();
        return { data: null, error: { message: json.error || 'Login failed' } };
      }
      const json = await res.json();
      localStorage.setItem('be4yougo_session_token', json.token);
      notifyListeners('SIGNED_IN', json.session);
      return { data: { user: json.session.user, session: json.session }, error: null };
    },

    async signOut() {
      localStorage.removeItem('be4yougo_session_token');
      notifyListeners('SIGNED_OUT', null);
      return { error: null };
    }
  }
} as any;

function notifyListeners(event: string, session: any) {
  listeners.forEach(cb => cb(event, session));
}