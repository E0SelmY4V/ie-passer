import { ChildProcessWithoutNullStreams } from 'child_process'
import { TransformOptions } from '@babel/core'
export namespace iePasser {
	declare interface Conf {
		opts?: TransformOptions
		out?: string
		version?: '5' | '7' | '8' | '9' | '10' | '11' | 'edge'
	}
	export let defConf: Conf
}
export function iePasser(
	path: string,
	test: { [testName: number | string]: () => void },
	conf?: iePasser.Conf,
): Promise<ChildProcessWithoutNullStreams>
export default iePasser